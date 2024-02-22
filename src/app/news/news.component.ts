import { Component } from '@angular/core';
import { GeneralService } from '../shared/services/general.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  subscriptions: Subscription[] = [];
  page: any = null;
  next_cursor: any = [];
  cursor: any = [];
  news: any = [];

  urlShare: string = window.location.href;
  linkedInShare: string =
    'https://www.linkedin.com/sharing/share-offsite/?url=';
  whatsappShare: string = 'https://api.whatsapp.com/send?text=';
  twitterShare: string = 'https://twitter.com/share?url=';
  instaShare: string = 'https://www.instagram.com/share?url=';
  facebookShare: string = 'https://www.facebook.com/sharer/sharer.php?u=';
  telegramShare: string = 'https://t.me/share/url?url=';

  constructor(private generalService: GeneralService, private router: Router) {}

  ngOnInit(): void {
    this.getNews();
  }

  openNews(newsid: number) {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this.router.navigateByUrl(`news/${newsid}`);
  }

  prevNews() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    if (this.next_cursor.length > 2) {
      this.next_cursor.splice(-2);
      this.cursor = this.next_cursor[this.next_cursor.length - 1];
    } else {
      this.next_cursor = [];
      this.cursor = null;
    }
    this.getNews();
  }

  nextNews() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this.cursor = this.next_cursor[this.next_cursor.length - 1];
    this.getNews();
  }

  getNews() {
    let body: any = '';
    if (this.cursor) {
      body = {
        next_cursor: this.cursor,
      };
    }
    this.subscriptions.push(
      this.generalService.getNews(body).subscribe({
        next: async (res: any) => {
          this.next_cursor.push(res.next_cursor);
          this.news = res.result;
          console.log(this.next_cursor);
        },
        error: (error: any) => {},
      })
    );
  }

  share(action: string) {
    switch (action) {
      case 'linkedin':
        window.open(`${this.linkedInShare}${this.urlShare}`, '_blank');
        break;

      case 'whatsup':
        window.open(`${this.whatsappShare}${this.urlShare}`, '_blank');
        break;

      case 'twitter':
        window.open(`${this.twitterShare}${this.urlShare}`, '_blank');
        break;

      case 'insta':
        window.open(`${this.instaShare}${this.urlShare}`, '_blank');
        break;

      case 'facebook':
        window.open(`${this.twitterShare}${this.urlShare}`, '_blank');
        break;

      case 'telegram':
        window.open(`${this.instaShare}${this.urlShare}`, '_blank');
        break;

      case 'copy':
        navigator.clipboard.writeText(this.urlShare).then(() => {});
        break;
    }
  }
}
