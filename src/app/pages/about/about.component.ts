import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor(public lang: LanguageService) {}

  get missionParagraph1(): string {
    return this.lang.t(
      'SCIENCE PULSE არის ორენოვანი სამეცნიერო სიახლეების პლატფორმა, რომელიც შექმნილია იმისთვის, რომ თანამედროვე მეცნიერება, კოსმოსის კვლევა, ტექნოლოგია, ფიზიკა, ჯანდაცვა, გარემო და კვლევის სიახლეები მარტივი და გასაგები გახადოს ქართულ- და ინგლისურენოვანი მკითხველებისთვის.',
      'SCIENCE PULSE is a bilingual science news platform created to make modern science, space exploration, technology, physics, health, environment, and research updates easier to understand for Georgian and English-speaking readers.'
    );
  }

  get missionParagraph2(): string {
    return this.lang.t(
      'ჩვენ გვჯერა, რომ სამეცნიერო ცოდნა ყველასთვის ხელმისაწვდომი უნდა იყოს. ამიტომ ვქმნით კონტენტს ორ ენაზე - ქართულად და ინგლისურად, რათა მეტმა ადამიანმა შეძლოს სამყაროს სიახლეების გაცნობა.',
      'We believe that scientific knowledge should be accessible to everyone. That is why we create content in two languages - Georgian and English - so that more people can stay informed about the world latest developments.'
    );
  }
}
