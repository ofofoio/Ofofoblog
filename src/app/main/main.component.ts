import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralService } from '../shared/services/general.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public placeholder = "assets/images/placeholder.png";

  subscriptions: Subscription[] = [];
  searchQuery: string = "";
  dataFetch: boolean = false;
  blogs: any = [];
  tags: any = [];
  selectedtag = "All"

  constructor(
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: async (queryParams: any) => {
        if (queryParams.tag) {
          this.selectedtag = queryParams.tag;
        } else {
          this.router.navigateByUrl(``);
        }
      },
      error: (error: any) => {
        this.router.navigateByUrl(``);
      },
    });
    this.getBlogs();
  }

  applyTag(tag: string) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    if (tag !== "All") {
      this.router.navigateByUrl(`/?tag=${tag}`);
    } else {
      this.router.navigateByUrl(``);
    }
    this.selectedtag = tag;
    this.getBlogs();
  }

  openBlog(blog: any) {
    this.router.navigateByUrl(`/blog/${blog.id}`);
  }

  getBlogs() {
    let body: any = {
      tags: this.selectedtag !== "All" ? this.selectedtag : '',
    };
    this.subscriptions.push(
      this.generalService.getblogs(body).subscribe({
        next: async (res: any) => {
          this.blogs = res.result;
          this.tags = res.tags;
        },
        error: (error: any) => { },
      })
    );
  }

  onKeyEnter() { }

  onKeyUp(input: any) {
    console.log(input);
  }

}
