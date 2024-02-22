import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public categories: any[] = [
    {
      name: "Security Assessments",
      id: "f512eeee-fbfa-46ca-98a3-ed2f7a594051"
    },
    {
      name: "GRC",
      id: "d4feab6e-413f-415c-9708-a6e39013f7b6"
    },
    {
      name: "Security Consulting",
      id: "9be2f790-555d-4ab0-b0f9-e1e0e69851df"
    },
    {
      name: "Cloud Security",
      id: "1674241e-6bed-4a6f-8fd3-8cbfb79e057f"
    },
    {
      name: "Email Security",
      id: "b30c6b6a-afa4-11ec-b909-0242ac120002"
    },
    {
      name: "Application Security",
      id: "9eecf746-6e3d-4c80-8cdd-c87d1ece7448"
    },
    {
      name: "Data Security",
      id: "66d07c83-c749-495b-a493-e57cb36b2b89"
    },
    {
      name: "Security Testing",
      id: "8af9d38a-6b8f-445d-9e74-82001a0cd31b"
    },
    {
      name: "Insurance",
      id: "09b75516-1bea-434e-a7df-764498cc7450"
    },
  ];
  @Output() aboutus = new EventEmitter<boolean>();

  adress: any = [
    'https://maps.app.goo.gl/tooapeFfrdfmCrZh9',
    'https://maps.app.goo.gl/msB4z1gvotNemScP9',
    'https://maps.app.goo.gl/axcX7yP5xU9yqxYD9'
  ]

  openAdress(index: number){
    window.open(this.adress[index]);
  }

  redirect(action: string, id?: string) {
    if (action === 'seller') {
      window.open(`${environment.landingpageUrl}/seller`, '_blank')
    } else if (action === 'join') {
      window.open(`${environment.buyerUrl}/registration`, '_blank')
    } else if (action === 'signin') {
      window.open(`${environment.buyerUrl}/signin`, '_blank')
    } else if (action === 'blog') {
      window.open(`${environment.blog}`, '_blank')
    } else if (action === 'support') {
      window.open(`${environment.support}`, '_blank')
    } else if (action === 'about') {
      this.aboutus.emit(true);
    } else if (action === 'category' && id) {
      window.open(`${environment.marketplaceUrl}/dashboard?pv=${id}`)
    }
  }

  redirecttermly(action: string) {
    if (action === 'privacy') {
      window.open(`https://app.termly.io/document/privacy-policy/2d06d983-b9a6-4097-8907-8eb535e5e656`, '_blank')
    } else if (action === 'disclamer') {
      window.open(`https://app.termly.io/document/disclaimer/11b7640f-a6da-4e79-aee0-b26aa57bc93f`, '_blank')
    } else if (action === 'dsar') {
      window.open(`https://app.termly.io/notify/2d06d983-b9a6-4097-8907-8eb535e5e656`, '_blank')
    } else if (action === 'info') {
      window.open(`https://app.termly.io/notify/2d06d983-b9a6-4097-8907-8eb535e5e656`, '_blank')
    }
  }

  embededCode() {
    const fullurl: any = `${window.location.href}`;
    let link: any =
      "<iframe src=" + fullurl + " width='100%' height='500'></iframe>";
    navigator.clipboard.writeText(link);
    const textarea = document.createElement("textarea");
    textarea.value = link;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

}
