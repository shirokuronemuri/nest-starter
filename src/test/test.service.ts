import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async test() {
    const value = await this.cache.get<string>('key');
    if (!value) {
      await this.cache.set('key', 'cache existing');
    }
    return value ?? 'cache set';
  }
}
