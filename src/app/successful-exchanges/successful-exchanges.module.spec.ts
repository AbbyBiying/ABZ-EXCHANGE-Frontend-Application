import { SuccessfulExchangesModule } from './successful-exchanges.module';

describe('SuccessfulExchangesModule', () => {
  let successfulExchangesModule: SuccessfulExchangesModule;

  beforeEach(() => {
    successfulExchangesModule = new SuccessfulExchangesModule();
  });

  it('should create an instance', () => {
    expect(successfulExchangesModule).toBeTruthy();
  });
});
