import { Voice } from '../../../src';

describe('Voice v2 SVAML helper', () => {
  const phone = (number: string): Voice.v2.Phone => {
    return {
      type: 'PHONE',
      phone: {
        number,
      },
    };
  };

  describe('CommandsSequenceCreator', () => {
    it('should stack simple commands in call order', () => {
      const commands = new Voice.v2.CommandsSequenceCreator()
        .answer()
        .text('Hello', 'Emma')
        .play('https://example.com/beep.wav')
        .pause(5000)
        .bridgeCall('support')
        .hangup()
        .hangup({
          name: 'b-leg',
        })
        .command({
          command: 'hangup',
          callName: 'injected',
        })
        .build();

      expect(commands).toEqual([
        {
          command: 'answer',
        },
        {
          command: 'messages',
          messages: [{
            type: 'SAY',
            say: {
              text: 'Hello',
              voiceName: 'Emma',
            },
          }],
        },
        {
          command: 'messages',
          messages: [{
            type: 'PLAY',
            play: {
              url: 'https://example.com/beep.wav',
            },
          }],
        },
        {
          command: 'pause',
          durationMilliseconds: 5000,
        },
        {
          command: 'bridgeCall',
          bridgeName: 'support',
        },
        {
          command: 'hangup',
        },
        {
          command: 'hangup',
          callName: 'b-leg',
        },
        {
          command: 'hangup',
          callName: 'injected',
        },
      ]);
    });

    it('should build a dial command from the dial creator', () => {
      const commands = new Voice.v2.CommandsSequenceCreator()
        .dial((dial) => {
          dial
            .to(phone('+15550001111'))
            .from(phone('+15550002222'))
            .name('b-leg')
            .timeoutDuration(30)
            .maxDurationSeconds(600)
            .onAnswer((sequence) => {
              sequence.text('Answered', 'Emma');
            })
            .onFailure((sequence) => {
              sequence.hangup();
            });
        })
        .build();

      expect(commands).toEqual([{
        command: 'dial',
        to: phone('+15550001111'),
        from: phone('+15550002222'),
        callName: 'b-leg',
        dialTimeoutDurationSeconds: 30,
        maxCallDurationSeconds: 600,
        events: {
          onAnswer: [{
            command: 'messages',
            messages: [{
              type: 'SAY',
              say: {
                text: 'Answered',
                voiceName: 'Emma',
              },
            }],
          }],
          onFailure: [{
            command: 'hangup',
          }],
        },
      }]);
    });

    it('should reject a dial command without a destination', () => {
      const sequence = new Voice.v2.CommandsSequenceCreator();

      expect(() => {
        sequence.dial((dial) => {
          dial.name('b-leg');
        });
      }).toThrow('dial requires to');
    });

    it('should stack amd event commands', () => {
      const commands = new Voice.v2.CommandsSequenceCreator()
        .amd((amd) => {
          amd
            .onHuman((sequence) => {
              sequence.answer();
            })
            .onHuman((sequence) => {
              sequence.hangup();
            })
            .onMachine((sequence) => {
              sequence.hangup();
            });
        })
        .build();

      expect(commands).toEqual([{
        command: 'amd',
        events: {
          onHuman: [
            {
              command: 'answer',
            },
            {
              command: 'hangup',
            },
          ],
          onMachine: [{
            command: 'hangup',
          }],
        },
      }]);
    });

    it('should build messages, custom events, and recording commands', () => {
      const commands = new Voice.v2.CommandsSequenceCreator()
        .messages((messages) => {
          messages
            .messagesName('greeting')
            .text('Hello', 'Emma', 'TEXT')
            .play('https://example.com/beep.wav')
            .onFinish((sequence) => {
              sequence.pause(1000);
            });
        })
        .customEvents((events) => {
          events.trigger(
            'collect.input',
            'https://example.com/hook',
            'https://example.com/fallback',
          );
        })
        .recording((recording) => {
          recording
            .recordingName('call')
            .destination('AWS')
            .destinationUrl('s3://bucket/call.mp3')
            .credentials('secret')
            .format('MP3')
            .onFinish((sequence) => {
              sequence.hangup();
            });
        })
        .recording((recording) => {
          recording.stop('call');
        })
        .build();

      expect(commands).toEqual([
        {
          command: 'messages',
          messagesName: 'greeting',
          messages: [
            {
              type: 'SAY',
              say: {
                text: 'Hello',
                voiceName: 'Emma',
                format: 'TEXT',
              },
            },
            {
              type: 'PLAY',
              play: {
                url: 'https://example.com/beep.wav',
              },
            },
          ],
          events: {
            onFinish: [{
              command: 'pause',
              durationMilliseconds: 1000,
            }],
          },
        },
        {
          command: 'webhook',
          webhookName: 'collect.input',
          url: 'https://example.com/hook',
          fallbackUrl: 'https://example.com/fallback',
        },
        {
          command: 'startRecording',
          recordingName: 'call',
          recordingOptions: {
            destination: 'AWS',
            destinationUrl: 's3://bucket/call.mp3',
            credentials: 'secret',
            format: 'MP3',
          },
          events: {
            onFinish: [{
              command: 'hangup',
            }],
          },
        },
        {
          command: 'stopRecording',
          recordingName: 'call',
        },
      ]);
    });

    it('should build a custom event without a fallback URL', () => {
      const commands = new Voice.v2.CommandsSequenceCreator()
        .customEvents((events) => {
          events.trigger('collect.input', 'https://example.com/hook');
        })
        .build();

      expect(commands).toEqual([{
        command: 'webhook',
        webhookName: 'collect.input',
        url: 'https://example.com/hook',
      }]);
    });

    it('should reject a custom event that does not call trigger', () => {
      expect(() => {
        new Voice.v2.CommandsSequenceCreator().customEvents(() => undefined);
      }).toThrow('customEvents requires trigger');
    });

    it('should build a menu from items and prompts', () => {
      const greeting = new Voice.v2.CommandsSequenceCreator().prompt((prompt) => {
        prompt.text('Press 1', 'Emma').allowBargeIn(true);
      });
      const commands = new Voice.v2.CommandsSequenceCreator()
        .menu((menu) => {
          menu
            .name('main')
            .item('main', (item) => {
              item
                .prompt(greeting)
                .repeatPrompt((prompt) => {
                  prompt.play('https://example.com/repeat.wav');
                })
                .inputTimeoutDurationSeconds(5)
                .repeatCount(2)
                .minimumInputLength(1)
                .maximumInputLength(1)
                .terminatingSequence('#')
                .inputMethods(['DTMF'])
                .match('1', (sequence) => {
                  sequence.hangup();
                })
                .onFail((sequence) => {
                  sequence.hangup();
                });
            });
        })
        .build();

      expect(commands).toEqual([{
        command: 'menu',
        startMenu: 'main',
        menus: {
          main: {
            prompt: {
              allowBargeIn: true,
              messages: [{
                type: 'SAY',
                say: {
                  text: 'Press 1',
                  voiceName: 'Emma',
                },
              }],
            },
            repeatPrompt: {
              messages: [{
                type: 'PLAY',
                play: {
                  url: 'https://example.com/repeat.wav',
                },
              }],
            },
            inputTimeoutDurationSeconds: 5,
            repeatCount: 2,
            minimumInputLength: 1,
            maximumInputLength: 1,
            terminatingSequence: '#',
            inputMethods: ['DTMF'],
            matches: {
              1: [{
                command: 'hangup',
              }],
            },
            onFail: [{
              command: 'hangup',
            }],
          },
        },
      }]);
    });

    it('should return a prompt from the sequence without appending a command', () => {
      const sequence = new Voice.v2.CommandsSequenceCreator().answer();
      const prompt = sequence.prompt((builder) => {
        builder.text('Hello', 'Emma');
      });

      expect(prompt).toEqual({
        messages: [{
          type: 'SAY',
          say: {
            text: 'Hello',
            voiceName: 'Emma',
          },
        }],
      });
      expect(sequence.build()).toEqual([{
        command: 'answer',
      }]);
    });

    it('should reject a duplicate menu item name', () => {
      expect(() => {
        new Voice.v2.CommandsSequenceCreator().menu((menu) => {
          menu
            .name('main')
            .item('main', (item) => {
              item.prompt((prompt) => {
                prompt.text('Hi', 'Emma');
              });
            })
            .item('main', (item) => {
              item.prompt((prompt) => {
                prompt.text('Again', 'Emma');
              });
            });
        });
      }).toThrow('menu item "main" is already defined');
    });

    it('should append gotoMenu when the target is an item of the same menu', () => {
      const commands = new Voice.v2.CommandsSequenceCreator()
        .menu((menu) => {
          menu
            .name('main')
            .item('main', (item) => {
              item
                .match('1', (sequence) => {
                  sequence.gotoMenu('billing');
                })
                .onFail((sequence) => {
                  sequence.gotoMenu('main');
                });
            })
            .item('billing', (item) => {
              item.prompt((prompt) => {
                prompt.text('Billing', 'Emma');
              });
            });
        })
        .build();

      expect(commands).toEqual([{
        command: 'menu',
        startMenu: 'main',
        menus: {
          main: {
            matches: {
              1: [{
                command: 'gotoMenu',
                menuName: 'billing',
              }],
            },
            onFail: [{
              command: 'gotoMenu',
              menuName: 'main',
            }],
          },
          billing: {
            prompt: {
              messages: [{
                type: 'SAY',
                say: {
                  text: 'Billing',
                  voiceName: 'Emma',
                },
              }],
            },
          },
        },
      }]);
    });

    it('should reject a gotoMenu target that is not an item of the enclosing menu', () => {
      expect(() => {
        new Voice.v2.CommandsSequenceCreator().menu((menu) => {
          menu
            .name('main')
            .item('main', (item) => {
              item.match('1', (sequence) => {
                sequence.gotoMenu('missing');
              });
            });
        });
      }).toThrow('gotoMenu "missing" is not defined');
    });

    it('should reject a gotoMenu nested under a menu item event', () => {
      expect(() => {
        new Voice.v2.CommandsSequenceCreator().menu((menu) => {
          menu
            .name('main')
            .item('main', (item) => {
              item.match('1', (sequence) => {
                sequence.dial((dial) => {
                  dial
                    .to(phone('+15550001111'))
                    .onAnswer((nested) => {
                      nested.gotoMenu('missing');
                    });
                });
              });
            });
        });
      }).toThrow('gotoMenu "missing" is not defined');
    });

    it('should reject a gotoMenu that is outside a menu', () => {
      expect(() => {
        new Voice.v2.CommandsSequenceCreator()
          .gotoMenu('main')
          .build();
      }).toThrow('gotoMenu "main" is not defined');
    });

    it('should reject a gotoMenu injected into a menu whose target is missing', () => {
      expect(() => {
        new Voice.v2.CommandsSequenceCreator()
          .command({
            command: 'menu',
            startMenu: 'main',
            menus: {
              main: {
                matches: {
                  1: [{
                    command: 'gotoMenu',
                    menuName: 'missing',
                  }],
                },
              },
            },
          })
          .build();
      }).toThrow('gotoMenu "missing" is not defined');
    });

    it('should reject a menu start name that is not an item', () => {
      expect(() => {
        new Voice.v2.CommandsSequenceCreator().menu((menu) => {
          menu
            .name('missing')
            .item('main', (item) => {
              item.prompt((prompt) => {
                prompt.text('Hi', 'Emma');
              });
            });
        });
      }).toThrow('menu start "missing" is not defined');
    });

    it('should stop a named message sequence', () => {
      const commands = new Voice.v2.CommandsSequenceCreator()
        .messages((messages) => {
          messages.stop('greeting', 'ONLY_PLAYING');
        })
        .messages((messages) => {
          messages.stop('greeting');
        })
        .build();

      expect(commands).toEqual([
        {
          command: 'stopMessages',
          messagesName: 'greeting',
          flags: 'ONLY_PLAYING',
        },
        {
          command: 'stopMessages',
          messagesName: 'greeting',
        },
      ]);
    });

    it('should validate a sequence built inside another sequence callback', () => {
      expect(() => {
        new Voice.v2.CommandsSequenceCreator().menu((menu) => {
          menu
            .name('main')
            .item('main', (item) => {
              item.match('1', () => {
                new Voice.v2.CommandsSequenceCreator().gotoMenu('main').build();
              });
            });
        });
      }).toThrow('gotoMenu "main" is not defined');
    });

    it('should accept match and item names that exist on Object.prototype', () => {
      const commands = new Voice.v2.CommandsSequenceCreator()
        .menu((menu) => {
          menu
            .name('constructor')
            .item('constructor', (item) => {
              item.match('toString', (sequence) => {
                sequence.hangup();
              });
            });
        })
        .build();

      expect(commands).toEqual([{
        command: 'menu',
        startMenu: 'constructor',
        menus: {
          constructor: {
            matches: {
              toString: [{
                command: 'hangup',
              }],
            },
          },
        },
      }]);
    });
  });
});
