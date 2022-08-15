import { Subject } from 'rxjs';

export class SubjectManager {
  subject$ = new Subject(); // Canal de comunicación.

  getSubject() {
    return this.subject$.asObservable(); // Convertimos a subject en un observable para evitar que emita información.
  }

  setSubject(value) {
    this.subject$.next(value);
  }
}
