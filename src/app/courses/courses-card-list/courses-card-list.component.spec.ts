import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { CoursesCardListComponent } from "./courses-card-list.component";
import { CoursesModule } from "../courses.module";
import { COURSES } from "../../../../server/db-data";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { sortCoursesBySeqNo } from "../home/sort-course-by-seq";
import { Course } from "../model/course";
import { setupCourses } from "../common/setup-test-data";

describe("CoursesCardListComponent", () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CoursesModule],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(CoursesCardListComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
        });
    })
  );

  it("should create the component", () => {
    expect(component).toBeTruthy();
    expect(component instanceof CoursesCardListComponent).toBeTrue();
  });

  it("should display the course list", () => {
    component.courses = setupCourses();
    fixture.detectChanges();

    const courses = el.queryAll(By.css(".course-card"));

    expect(courses).toBeTruthy();
    expect(courses.length).toBe(12);
  });

  it("should display the first course", () => {
    component.courses = setupCourses();
    fixture.detectChanges();

    const firstCourse = component.courses[0];

    const renderedCourse = el.query(By.css(".course-card"));

    const renderedTitle = renderedCourse.query(By.css("mat-card-title"));
    const renderedTitleContent = renderedTitle.nativeElement.textContent;

    const renderedImage = renderedCourse.query(By.css("img"));
    const renderedImageSource = renderedImage.nativeElement.src;

    expect(renderedCourse).toBeTruthy();

    expect(renderedTitle).toBeTruthy();
    expect(renderedTitleContent).toBe(firstCourse.titles.description);

    expect(renderedImage).toBeTruthy();
    expect(renderedImageSource).toBe(firstCourse.iconUrl);
  });
});
