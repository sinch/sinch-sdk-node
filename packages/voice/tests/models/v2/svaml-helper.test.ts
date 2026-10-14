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

  describe('Calls', () => {
    it('should build a hangup command for the current leg', () => {
      expect(Voice.v2.Calls.hangup()).toEqual({
        command: 'hangup',
      });
    });

    it('should write the call leg name on hangup', () => {
      expect(Voice.v2.Calls.hangup({
        name: 'b-leg',
      })).toEqual({
        command: 'hangup',
        callName: 'b-leg',
      });
    });

    it('should build one answer, bridge, or pause command', () => {
      expect(Voice.v2.Calls.answer()).toEqual({ command: 'answer' });
      expect(Voice.v2.Calls.bridgeCall('support')).toEqual({
        command: 'bridgeCall',
        bridgeName: 'support',
      });
      expect(Voice.v2.Calls.pause(500)).toEqual({
        command: 'pause',
        durationMilliseconds: 500,
      });
    });

    it('should build one dial command and accept a single event command', () => {
      expect(Voice.v2.Calls.dial({
        to: phone('+15550001111'),
        from: phone('+15550002222'),
        name: 'b-leg',
        timeoutDurationSeconds: 30,
        onAnswer: Voice.v2.Calls.hangup(),
      })).toEqual({
        command: 'dial',
        to: phone('+15550001111'),
        from: phone('+15550002222'),
        callName: 'b-leg',
        dialTimeoutDurationSeconds: 30,
        events: {
          onAnswer: [{ command: 'hangup' }],
        },
      });
    });
  });

  describe('Recording', () => {
    it('should build recording options and one start or stop command', () => {
      const options = Voice.v2.Recording.options({
        destination: 'AWS',
        url: 's3://bucket/call.mp3',
        credentials: 'secret',
        format: 'MP3',
      });

      expect(options).toEqual({
        destination: 'AWS',
        destinationUrl: 's3://bucket/call.mp3',
        credentials: 'secret',
        format: 'MP3',
      });
      expect(Voice.v2.Recording.start(options, {
        name: 'call',
        onFinish: Voice.v2.Calls.hangup(),
      })).toEqual({
        command: 'startRecording',
        recordingName: 'call',
        recordingOptions: options,
        events: {
          onFinish: [{ command: 'hangup' }],
        },
      });
      expect(Voice.v2.Recording.stop('call')).toEqual({
        command: 'stopRecording',
        recordingName: 'call',
      });
    });
  });

  describe('Amd', () => {
    it('should build one amd command', () => {
      expect(Voice.v2.Amd.activate()).toEqual({
        command: 'amd',
      });
      expect(Voice.v2.Amd.activate({
        onHuman: Voice.v2.Calls.answer(),
        onMachine: Voice.v2.Calls.hangup(),
      })).toEqual({
        command: 'amd',
        events: {
          onHuman: [{ command: 'answer' }],
          onMachine: [{ command: 'hangup' }],
        },
      });
    });
  });

  describe('Webhook', () => {
    it('should build one webhook command', () => {
      expect(Voice.v2.Webhook.trigger({
        name: 'collect.input',
        url: 'https://example.com/hook',
        fallbackUrl: 'https://example.com/fallback',
      })).toEqual({
        command: 'webhook',
        webhookName: 'collect.input',
        url: 'https://example.com/hook',
        fallbackUrl: 'https://example.com/fallback',
      });
    });
  });

  describe('Menu', () => {
    it('should build one menu command, a prompt, and a goto command', () => {
      const prompt = Voice.v2.Menu.prompt((builder) => {
        builder.text('Press 1', 'Emma');
      });

      expect(Voice.v2.Menu.create((menu) => {
        menu
          .name('main')
          .item('main', (item) => {
            item.prompt(prompt).match('1', Voice.v2.Menu.goto('billing'));
          })
          .item('billing', (item) => {
            item.prompt(prompt);
          });
      })).toEqual({
        command: 'menu',
        startMenu: 'main',
        menus: {
          main: {
            prompt,
            matches: {
              1: [{
                command: 'gotoMenu',
                menuName: 'billing',
              }],
            },
          },
          billing: {
            prompt,
          },
        },
      });
    });

    it('should reuse a prebuilt menu item', () => {
      const item = Voice.v2.Menu.item((builder) => {
        builder.prompt((prompt) => prompt.text('Press 1', 'Emma')).match('1', Voice.v2.Calls.hangup());
      });

      expect(Voice.v2.Menu.create((menu) => {
        menu.name('main').item('main', item);
      })).toEqual({
        command: 'menu',
        startMenu: 'main',
        menus: {
          main: item,
        },
      });
    });
  });

  describe('Messages', () => {
    it('should build one text, ssml, play, or stop command', () => {
      expect(Voice.v2.Messages.text('Hello', 'Emma', {
        name: 'greeting',
        onFinish: Voice.v2.Calls.hangup(),
      })).toEqual({
        command: 'messages',
        messagesName: 'greeting',
        messages: [{
          type: 'SAY',
          say: {
            text: 'Hello',
            voiceName: 'Emma',
          },
        }],
        events: {
          onFinish: [{ command: 'hangup' }],
        },
      });
      expect(Voice.v2.Messages.ssml('<speak>Hello</speak>', 'Emma')).toEqual({
        command: 'messages',
        messages: [{
          type: 'SAY',
          say: {
            text: '<speak>Hello</speak>',
            voiceName: 'Emma',
            format: 'SSML',
          },
        }],
      });
      expect(Voice.v2.Messages.play('https://example.com/beep.wav')).toEqual({
        command: 'messages',
        messages: [{
          type: 'PLAY',
          play: {
            url: 'https://example.com/beep.wav',
          },
        }],
      });
      expect(Voice.v2.Messages.stop('greeting')).toEqual({
        command: 'stopMessages',
        messagesName: 'greeting',
      });
    });

    it('should stack messages in one command', () => {
      expect(Voice.v2.Messages.start((messages) => {
        messages.text('Hello', 'Emma').play('https://example.com/beep.wav');
      })).toEqual({
        command: 'messages',
        messages: [
          {
            type: 'SAY',
            say: {
              text: 'Hello',
              voiceName: 'Emma',
            },
          },
          {
            type: 'PLAY',
            play: {
              url: 'https://example.com/beep.wav',
            },
          },
        ],
      });
    });
  });

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

    it('should accept one command or a list where a nested handler takes commands', () => {
      const hangup = Voice.v2.Calls.hangup();
      const commands = new Voice.v2.CommandsSequenceCreator()
        .text('Hello', 'Emma', {
          onFinish: hangup,
        })
        .dial((dial) => {
          dial
            .to(phone('+15550001111'))
            .onAnswer([hangup, Voice.v2.Calls.hangup({ name: 'b-leg' })]);
        })
        .build();

      expect(commands).toEqual([
        {
          command: 'messages',
          messages: [{
            type: 'SAY',
            say: {
              text: 'Hello',
              voiceName: 'Emma',
            },
          }],
          events: {
            onFinish: [hangup],
          },
        },
        {
          command: 'dial',
          to: phone('+15550001111'),
          events: {
            onAnswer: [
              hangup,
              { command: 'hangup', callName: 'b-leg' },
            ],
          },
        },
      ]);
    });

    it('should accept a message name and onFinish on text and play shortcuts', () => {
      const commands = new Voice.v2.CommandsSequenceCreator()
        .text('Hello', 'Emma', {
          name: 'greeting',
          onFinish: (sequence) => {
            sequence.hangup();
          },
        })
        .play('https://example.com/beep.wav', {
          name: 'beep',
          onFinish: (sequence) => {
            sequence.pause(500);
          },
        })
        .build();

      expect(commands).toEqual([
        {
          command: 'messages',
          messagesName: 'greeting',
          messages: [{
            type: 'SAY',
            say: {
              text: 'Hello',
              voiceName: 'Emma',
            },
          }],
          events: {
            onFinish: [{
              command: 'hangup',
            }],
          },
        },
        {
          command: 'messages',
          messagesName: 'beep',
          messages: [{
            type: 'PLAY',
            play: {
              url: 'https://example.com/beep.wav',
            },
          }],
          events: {
            onFinish: [{
              command: 'pause',
              durationMilliseconds: 500,
            }],
          },
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
            .timeoutDurationSeconds(30)
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

    it('should build messages, webhook, and recording commands', () => {
      const commands = new Voice.v2.CommandsSequenceCreator()
        .messages((messages) => {
          messages
            .name('greeting')
            .text('Hello', 'Emma')
            .play('https://example.com/beep.wav')
            .onFinish((sequence) => {
              sequence.pause(1000);
            });
        })
        .webhook((webhook) => {
          webhook.trigger(
            'collect.input',
            'https://example.com/hook',
            'https://example.com/fallback',
          );
        })
        .recording((recording) => {
          recording
            .name('call')
            .options({
              destination: 'AWS',
              url: 's3://bucket/call.mp3',
              credentials: 'secret',
              format: 'MP3',
              recordingType: 'COMBINED',
              transcriptionOptions: {
                isEnabled: true,
                locale: 'en-US',
              },
            })
            .onFinish((sequence) => {
              sequence.hangup();
            });
        })
        .stopRecording('call')
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
            recordingType: 'COMBINED',
            transcriptionOptions: {
              isEnabled: true,
              locale: 'en-US',
            },
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

    it('should build a webhook without a fallback URL', () => {
      const commands = new Voice.v2.CommandsSequenceCreator()
        .webhook((webhook) => {
          webhook.trigger('collect.input', 'https://example.com/hook');
        })
        .build();

      expect(commands).toEqual([{
        command: 'webhook',
        webhookName: 'collect.input',
        url: 'https://example.com/hook',
      }]);
    });

    it('should reject a webhook that does not call trigger', () => {
      expect(() => {
        new Voice.v2.CommandsSequenceCreator().webhook(() => undefined);
      }).toThrow('webhook requires trigger');
    });

    it('should reject a recording that does not set options', () => {
      expect(() => {
        new Voice.v2.CommandsSequenceCreator().recording((recording) => {
          recording.name('call');
        });
      }).toThrow('recording requires options');
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
                .onFailure((sequence) => {
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
            onFailure: [{
              command: 'hangup',
            }],
          },
        },
      }]);
    });

    it('should build an SSML say from messages and prompts', () => {
      const ssml = '<speak>Hello</speak>';
      const say = {
        type: 'SAY',
        say: {
          text: ssml,
          format: 'SSML',
          voiceName: 'Emma',
        },
      };

      const commands = new Voice.v2.CommandsSequenceCreator()
        .messages((messages) => {
          messages.ssml(ssml, 'Emma');
        })
        .build();
      const prompt = new Voice.v2.CommandsSequenceCreator().prompt((builder) => {
        builder.ssml(ssml, 'Emma');
      });

      expect(commands).toEqual([{
        command: 'messages',
        messages: [say],
      }]);
      expect(prompt).toEqual({
        messages: [say],
      });
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
                .onFailure((sequence) => {
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
            onFailure: [{
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
        .stopMessages('greeting')
        .build();

      expect(commands).toEqual([{
        command: 'stopMessages',
        messagesName: 'greeting',
      }]);
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
