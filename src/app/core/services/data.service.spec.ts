import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [DataService]
    });
  });

  describe('all', () => {
    it('Should contain 151 pokemon.', (done) => {
      inject([DataService], async (ds: DataService) => {
        const all = await ds.all().toPromise();
        expect(all.length).toBe(151);
        done();
      })();
    });
  });

  describe('one', () => {
    it('Should get relevant pokemon details.', (done) => {
      inject([DataService], async (ds: DataService) => {
        const one = await ds.one(5).toPromise();
        expect(one.name).toBe('charmeleon');
        expect(one.type).toBe('fire');
        done();
      })();
    });
  });
});
