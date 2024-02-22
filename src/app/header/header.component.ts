import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralService } from '../shared/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  subscriptions: Subscription[] = [];

  threshold: number = 0.7 * window.innerHeight;
  fixedheader: boolean = false;

  categories: any = [];
  showMarketplacePanel: boolean = false;
  dataFetch: boolean = false;

  tabview: boolean = false;
  mobileview: boolean = false;
  @ViewChild('header') header: ElementRef | undefined;

  constructor(private generalService: GeneralService) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollPosition = window.scrollY;

    if (scrollPosition >= 40) {
      this.fixedheader = true;
    } else {
      this.fixedheader = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {}

  ngAfterViewInit() {
    if (!this.dataFetch) {
      this.dataFetch = true;
    }
  }

  ngOnInit(): void {
    this.getCategoriess();
    if (window.innerWidth <= 768) {
      this.tabview = true;
    }
    if (window.innerWidth <= 425) {
      this.mobileview = true;
    }
  }

  getCategoriess() {
    this.subscriptions.push(
      this.generalService.getCategoriess().subscribe({
        next: async (res: any) => {
          this.categories = res;
          this.categories.forEach((element: any) => {
            if (element.categoriesdata.length > 0) {
              element.opencategory = false;
              element.categoriesdata.forEach((option: any) => {
                if (option.subcategorydata.length > 0) {
                  option.opensubcategory = false;
                  option.hassubcategory = true;
                } else {
                  option.hassubcategory = false;
                }
              });
            }
          });
        },
        error: (error: any) => {},
      })
    );
  }

  opencategory(event: Event, index: number) {
    this.categories[index].opencategory = !this.categories[index].opencategory;
    event.stopPropagation();
  }

  opensubcategory(event: Event, index: number, subindex: number) {
    this.categories[index].categoriesdata[subindex].opensubcategory =
      !this.categories[index].categoriesdata[subindex].opensubcategory;
    event.stopPropagation();
  }

  openMarketplaceMenu() {
    this.showMarketplacePanel = true;
  }

  redirectcategory(query: string, id: any) {
    window.open(
      `${environment.marketplaceUrl}/dashboard?${query}=${id}`,
      '_blank'
    );
  }

  closeMarketplaceMenu() {
    this.showMarketplacePanel = false;
  }

  redirect(action: string) {
    if (action === 'marketplace') {
      window.open(`${environment.marketplaceUrl}`, '_blank');
    }
    if (action === 'seller') {
      window.open(`${environment.landingpageUrl}/seller`, '_blank');
    }
    if (action === 'signin') {
      window.open(`${environment.buyerUrl}/signin`, '_blank');
    }
    if (action === 'signup') {
      window.open(`${environment.buyerUrl}/registration`, '_blank');
    }
  }
}
