import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-notes',
  standalone: true,
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  imports: [MaterialModule]
})
export class NotesComponent {

}
