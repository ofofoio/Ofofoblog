import { Component, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralService } from '../shared/services/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-newsblog',
  templateUrl: './newsblog.component.html',
  styleUrls: ['./newsblog.component.scss'],
})
export class NewsblogComponent implements PipeTransform {
  subscriptions: Subscription[] = [];
  blogId: any = null;
  blogs: any = {};
  dataFetch: boolean = false;
  blogVideo: any = "";

  public placeholder = "assets/images/placeholder.png";

  urlShare: string = window.location.href;
  linkedInShare: string = 'https://www.linkedin.com/sharing/share-offsite/?url=';
  whatsappShare: string = 'https://api.whatsapp.com/send?text=';
  twitterShare: string = 'https://twitter.com/share?url=';
  instaShare: string = 'https://www.instagram.com/share?url=';
  facebookShare: string = 'https://www.facebook.com/sharer/sharer.php?u=';
  telegramShare: string = 'https://t.me/share/url?url=';

  constructor(
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: async (params: any) => {
        if (params.blogId) {
          this.blogId = params.blogId;
          this.getBlog();
        } else {
          // this.router.navigateByUrl(``);
        }
      },
      error: (error: any) => {
        this.router.navigateByUrl(``);
      },
    });
  }

  getBlog() {
    let body: any = '';
    if (this.blogId) {
      body = {
        id: this.blogId,
      };
    } else {
    }
    this.subscriptions.push(
      this.generalService.getblogs(body).subscribe({
        next: async (res: any) => {
          this.blogs = res.result;
          const regex = /youtu\.be\/([A-Za-z0-9_\-]+)(\?[\w=&-]*)?/;
          this.blogs.content.forEach((element: any) => {
            if (element.type === 'external' && element.external && element.external.url.includes('youtu')) {
              const id = element.external.url.match(regex);
              element.external['embedUrl'] = 'https://www.youtube.com/embed/' + id[1] + id[2];
              this.blogVideo = this.transform(element.external['embedUrl']);
              console.log(id, element.external['embedUrl'])
            }
          });
          this.dataFetch = true;
        },
        error: (error: any) => { },
      })
    );
  }

  redirect(action: string) {
    if (action === 'home') {
      window.open(`${environment.landingpageUrl}`, '_blank');
    } else if (action === 'news') {
      this.router.navigateByUrl(``);
    }
  }

  blog() {
    // window.open(`${this.news.Link}`, '_blank');
  }

  share(action: string) {
    switch (action) {
      case 'linkedin': window.open(`${this.linkedInShare}${this.urlShare}`, "_blank");
        break;

      case 'whatsup': window.open(`${this.whatsappShare}${this.urlShare}`, "_blank");
        break;

      case 'twitter': window.open(`${this.twitterShare}${this.urlShare}`, "_blank");
        break;

      case 'insta': window.open(`${this.instaShare}${this.urlShare}`, "_blank");
        break;

      case 'facebook': window.open(`${this.twitterShare}${this.urlShare}`, "_blank");
        break;

      case 'telegram': window.open(`${this.instaShare}${this.urlShare}`, "_blank");
        break;

      case 'copy': navigator.clipboard.writeText(this.urlShare)
        .then(() => { });
        break;
    }
  }
}
