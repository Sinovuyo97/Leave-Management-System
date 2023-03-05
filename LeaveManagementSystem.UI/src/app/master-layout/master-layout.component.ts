import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {

  modalRef: any;
  time :any ;


  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService,
  
  ) { }

  ngOnInit(): void {}}
  
