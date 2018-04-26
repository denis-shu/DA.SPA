import { AlertifyService } from './../../_service/alertify.service';
import { UserService } from './../../_service/user.service';
import { AuthService } from './../../_service/auth.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from '../../_Models/Photo';
import * as _ from 'underscore';
import { JsonpModule } from '@angular/http';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private alert: AlertifyService
  ) {}

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.auth.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMainPhoto: res.isMainPhoto
        };
        this.photos.push(photo);
        if (photo.isMainPhoto) {
          this.auth.changeMemberPhoto(photo.url);
          this.auth.currenrUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.auth.currenrUser));
        }
      }
    };
  }
  deletePhoto(id: number) {
    this.alert.confirm('A U sure to delete this photo?', () => {
      this.userService.deletePhoto(this.auth.decodedToken.nameid, id).subscribe(
        () => {
          this.photos.splice(_.findIndex(this.photos, { id: id }), 1);
          this.alert.success('Photo has been deleted');
        },
        err => {
          this.alert.error('Failed to delete');
        }
      );
    });
  }

  setMainPhoto(photo: Photo) {
    console.log(photo);
    this.userService
      .setMainPhoto(this.auth.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          this.currentMain = _.findWhere(this.photos, { isMainPhoto: true });
          this.currentMain.isMainPhoto = false;
          photo.isMainPhoto = true;
          this.getMemberPhotoChange.emit(photo.url);
          this.auth.changeMemberPhoto(photo.url);
          this.auth.currenrUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.auth.currenrUser));
        },
        err => {
          console.log(err);
          this.alert.error(err);
        }
      );
  }
}
