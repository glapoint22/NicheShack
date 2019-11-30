import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ShareService } from '../../../services/share.service';

@Component({
  selector: 'share-list',
  templateUrl: './share-list.component.html',
  styleUrls: ['./share-list.component.scss']
})
export class ShareListComponent {
  @Input() list: any;
  public show: boolean;
  public viewEdit: boolean;
  public viewOnly: boolean;
  public viewEditLinkCopied: boolean;
  public viewOnlyLinkCopied: boolean;
  

  constructor(private shareService: ShareService) { }



  onShareClick(action: string, type: string) {
    let pathName: string;
    let text: string;

    if (type === 'Collaborate') {
      pathName = '/collaborate-list/' + this.list.collaborateId;
      text = 'You\'re invited to help me with my list at NicheShack.com!';
    } else {
      pathName = '/shared-list/' + this.list.id;
      text = 'Check out my list at NicheShack.com!';
    }

    switch (action) {
      case 'Facebook':
        this.shareService.onFacebookClick(pathName, text);
        break;

      case 'Twitter':
        this.shareService.onTwitterClick(pathName, text);
        break;

      case 'Link':
        let copyText: any = document.getElementById("copy");

        copyText.value = location.origin + pathName;
        copyText.select();
        document.execCommand("copy");
    }
  }

}
