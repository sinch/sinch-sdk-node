import {
  getConversationIdFromConfig,
  getPrintFormat,
  initConversationService,
  printFullResponse,
} from '../../config';
import { UpdateConversationRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('***********************************');
  console.log('* Conversation_UpdateConversation *');
  console.log('***********************************');

  const conversationId = getConversationIdFromConfig();

  const requestData: UpdateConversationRequestData = {
    conversation_id: conversationId,
    update_mask: ['metadata'],
    updateConversationRequestBody: {
      metadata: 'Updates metadata',
      active_channel: 'KAKAOTALK',
    },
  };

  const conversationService = initConversationService();
  const response = await conversationService.conversation.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Conversation updated! New metadata: '${response.metadata}`);
    console.log(`Verifying the active channel (it should be unchanged):\nOLD: 'MESSENGER'\nNEW: '${response.active_channel}'`);
  } else {
    printFullResponse(response);
  }

})();
