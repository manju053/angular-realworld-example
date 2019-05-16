import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  articleForm: FormGroup;
  article: Article = {} as Article;
  tagField =  new FormControl();
  isSubmitting: boolean = false;
  errors: Object = {};
  

  constructor(private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {

      this.articleForm = fb.group({
        title: '',
        description: '',
        body: '',
      });


          
    }

  ngOnInit() {

    this.article.tagList = [];
    this.route.data.subscribe(
      (data : {article: Article}) => {
        if(data.article) {
          this.article = data.article
          this.articleForm.patchValue(this.article)
        }
      }
    );
  }

  addTag() {

    let tag = this.tagField.value;
    if(this.article.tagList.indexOf(tag) < 0 ) {
      this.article.tagList.push(tag)
    }

    this.tagField.reset();
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter((tag) => tag !== tagName);
  }

  updateArticle(values: Object) {
    <any>Object.assign(this.article, values);
  }

  submitForm() {
    this.isSubmitting = true;
    this.updateArticle(this.articleForm.value);

    this.articleService.save(this.article)
      .subscribe(
        article => this.router.navigateByUrl('/article/' + article.slug),
        err => {
          this.errors = err
          this.isSubmitting = false;
        }
      )
  }

}
