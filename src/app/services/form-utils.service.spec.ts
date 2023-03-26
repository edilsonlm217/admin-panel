import { TestBed } from "@angular/core/testing";
import { NgForm } from "@angular/forms";
import { FormUtilsService } from "./form-utils.service";

describe('FormUtilsService', () => {
  let service: FormUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('resolveIsFormValid', () => {
    it('should return true if the NgForm instance is valid', () => {
      const ngForm = {
        form: {
          status: 'VALID',
        }
      } as NgForm;
      expect(service.resolveIsFormValid(ngForm)).toBeTrue();
    });

    it('should return false if the NgForm instance is invalid', () => {
      const ngForm = {
        form: {
          status: 'INVALID',
        }
      } as NgForm;
      expect(service.resolveIsFormValid(ngForm)).toBeFalse();
    });
  });
});
