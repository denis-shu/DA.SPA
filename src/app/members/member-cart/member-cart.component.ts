import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_Models/User';

@Component({
  selector: 'app-member-cart',
  templateUrl: './member-cart.component.html',
  styleUrls: ['./member-cart.component.css']
})
export class MemberCartComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {  }

}
