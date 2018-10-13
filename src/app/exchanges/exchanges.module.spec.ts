import { ExchangesModule } from './exchanges.module';

describe('ExchangesModule', () => {
  let exchangesModule: ExchangesModule;

  beforeEach(() => {
    exchangesModule = new ExchangesModule();
  });

  it('should create an instance', () => {
    expect(exchangesModule).toBeTruthy();
  });
});
