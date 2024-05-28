import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperComponent } from './component/developer/developer.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { TechnologieComponent } from './component/technologie/technologie.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dev', pathMatch: 'full' },
    { path: 'dev',  component: DeveloperComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'technologies', component: TechnologieComponent },
];

