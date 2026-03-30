import { CallBlockingRulesApi } from './call-blocking-rules-api';
import { CallBlockingRule, CreateBlockingRuleRequestData, DeleteBlockingRuleRequestData, ListBlockingRulesRequestData, UpdateBlockingRuleRequestData } from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class CallBlockingRulesApiFixture implements Partial<Readonly<CallBlockingRulesApi>> {

  /**
   * Fixture associated to function createBlockingRule
   */
  public create: jest.Mock<Promise<CallBlockingRule>, [CreateBlockingRuleRequestData]> = jest.fn();
  /**
   * Fixture associated to function deleteBlockingRuleById
   */
  public delete: jest.Mock<Promise<void>, [DeleteBlockingRuleRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<CallBlockingRule>, [ListBlockingRulesRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateBlockingRuleById
   */
  public update: jest.Mock<Promise<CallBlockingRule>, [UpdateBlockingRuleRequestData]> = jest.fn();
}

