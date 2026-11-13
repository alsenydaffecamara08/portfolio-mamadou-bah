import {Routes} from '@angular/router';
export const routes:Routes=[
 {path:'',loadComponent:()=>import('./pages/home/home').then(m=>m.HomeComponent),title:'Portfolio | Mamadou Radiagui BAH'},
 {path:'projets',loadComponent:()=>import('./pages/projects-page/projects-page').then(m=>m.ProjectsPageComponent),title:'Projets | Mamadou Radiagui BAH'},
 {path:'projets/:slug',loadComponent:()=>import('./pages/project-detail/project-detail').then(m=>m.ProjectDetailComponent)},
 {path:'blog',loadComponent:()=>import('./pages/blog-page/blog-page').then(m=>m.BlogPageComponent),title:'Blog | Mamadou Radiagui BAH'},
 {path:'blog/:slug',loadComponent:()=>import('./pages/article-detail/article-detail').then(m=>m.ArticleDetailComponent)},
 {path:'**',loadComponent:()=>import('./pages/not-found/not-found').then(m=>m.NotFoundComponent)}
];
