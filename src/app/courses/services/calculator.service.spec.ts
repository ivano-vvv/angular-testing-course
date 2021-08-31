import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  let calculatorService: CalculatorService;
  let mockLogger: LoggerService;

  beforeEach(() => {
    mockLogger = jasmine.createSpyObj("LoggerService", ["log"]);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: mockLogger },
      ],
    });

    calculatorService = TestBed.get(CalculatorService);
  });

  it("should add two numbers", () => {
    const result = calculatorService.add(2, 2);

    expect(result).toBe(4);
    expect(mockLogger.log).toHaveBeenCalledTimes(1);
  });

  it("should substract two numbers", () => {
    const result = calculatorService.subtract(2, 2);

    expect(result).toBe(0);
    expect(mockLogger.log).toHaveBeenCalledTimes(1);
  });
});
