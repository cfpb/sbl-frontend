import { hasInstitutionTypeChanged } from '../submitUpdateFinancialProfile';

describe('hasInstitutionTypeChanged', () => {
  it('Selections NOT changed', () => {
    const apiData = [{ details: '', sbl_type: { id: '1', name: 'Type 1' } }];
    const formData = [undefined, true];
    expect(hasInstitutionTypeChanged(formData, apiData, '')).toBe(false);
  });

  it('Selections changed', () => {
    const apiData = [{ details: '', sbl_type: { id: '1', name: 'Type 1' } }];
    const formData = [undefined, true, true];
    expect(hasInstitutionTypeChanged(formData, apiData, '')).toBe(true);
  });

  it('Other details NOT changed', () => {
    const apiData = [
      { details: '13', sbl_type: { id: '13', name: 'Type 13' } },
    ];
    const formData = [];
    formData[13] = true;
    const formOther = '13';
    expect(hasInstitutionTypeChanged(formData, apiData, formOther)).toBe(false);
  });

  it('Other details changed', () => {
    const apiData = [
      { details: '13', sbl_type: { id: '13', name: 'Type 13' } },
    ];
    const formData = [];
    formData[13] = true;
    const formOther = 'details changed';
    expect(hasInstitutionTypeChanged(formData, apiData, formOther)).toBe(true);
  });
});
