import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTemplateDrivenComponent } from './select-template-driven.component';

describe('SelectReactiveComponent', () => {
  let component: SelectTemplateDrivenComponent<unknown>;
  let fixture: ComponentFixture<SelectTemplateDrivenComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTemplateDrivenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectTemplateDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
