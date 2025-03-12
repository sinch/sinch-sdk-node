import { MOBinary } from '../mo-binary';
import { MOText } from '../mo-text';
import { MOMedia } from '../mo-media';

export type InboundMessageResponse = MOText | MOBinary | MOMedia;
