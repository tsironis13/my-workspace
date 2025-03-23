import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectReactiveComponent } from './select-reactive.component';

describe('SelectReactiveComponent', () => {
  let component: SelectReactiveComponent<unknown, {}>;
  let fixture: ComponentFixture<SelectReactiveComponent<unknown, {}>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectReactiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
