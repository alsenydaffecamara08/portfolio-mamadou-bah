import { Injectable } from '@angular/core';
import { createClient } from '@sanity/client';

export interface PortfolioProfile {
  fullName:string; jobTitleFr?:string; jobTitleEn?:string; biographyFr?:string; biographyEn?:string;
  photoUrl?:string; email?:string; locationFr?:string; locationEn?:string;
  github?:string; linkedin?:string; cvUrl?:string; availability?:boolean;
}
export interface PortfolioSkill {
  _id:string; name:string; category:string; descriptionFr?:string; descriptionEn?:string;
  iconUrl?:string; order?:number;
}
export interface Project {
  _id:string; slug:string; titleFr?:string; titleEn?:string; summaryFr?:string; summaryEn?:string;
  descriptionFr?:string; descriptionEn?:string; challengeFr?:string; challengeEn?:string;
  solutionFr?:string; solutionEn?:string; resultFr?:string; resultEn?:string;
  category?:string; technologies?:string[]; coverUrl?:string; galleryUrls?:string[];
  demoUrl?:string; githubUrl?:string; featured?:boolean; year?:number;
}
export interface Experience {
  _id:string; roleFr?:string; roleEn?:string; organization?:string; location?:string;
  descriptionFr?:string; descriptionEn?:string; startDate?:string; endDate?:string; current?:boolean;
}
export interface Education {
  _id:string; diplomaFr?:string; diplomaEn?:string; institution?:string; year?:number;
  descriptionFr?:string; descriptionEn?:string; certificateUrl?:string; kind?:string;
}
export interface ServiceItem {
  _id:string; titleFr?:string; titleEn?:string; descriptionFr?:string; descriptionEn?:string; iconKey?:string;
}
export interface Article {
  _id:string; slug:string; titleFr?:string; titleEn?:string; excerptFr?:string; excerptEn?:string;
  bodyFr?:any[]; bodyEn?:any[]; imageUrl?:string; publishedAt?:string; category?:string;
}
export interface SiteSettings {
  email?:string; github?:string; linkedin?:string; whatsapp?:string; cvUrl?:string;
  locationFr?:string; locationEn?:string; availability?:boolean;
  introFr?:string; introEn?:string;
}

export interface PortfolioStory {
  _id: string; titleFr?: string; titleEn?: string; textFr?: string; textEn?: string;
  author?: string; imageUrl?: string;
}

@Injectable({providedIn:'root'})
export class SanityService {
  private client = createClient({
    projectId:'idzv0pyv', dataset:'production', apiVersion:'2026-11-01',
    useCdn:true, perspective:'published'
  });
  getStories(kind: 'testimonial' | 'journeyPhoto'): Promise<PortfolioStory[]> {
    return this.client.fetch(`*[_type==$kind && visible==true] | order(coalesce(order,0) asc,_createdAt desc){
      _id,titleFr,titleEn,textFr,textEn,author,"imageUrl":image.asset->url
    }`, {kind});
  }
  getProfile():Promise<PortfolioProfile|null> {
    return this.client.fetch(`*[_type=="profile"]|order(_updatedAt desc)[0]{
      fullName,jobTitleFr,jobTitleEn,biographyFr,biographyEn,
      "photoUrl":photo.asset->url,email,locationFr,locationEn,github,linkedin,
      "cvUrl":cv.asset->url,availability
    }`);
  }
  getSkills():Promise<PortfolioSkill[]> {
    return this.client.fetch(`*[_type=="skill" && visible!=false]|order(order asc,name asc){
      _id,name,category,descriptionFr,descriptionEn,order,"iconUrl":icon.asset->url
    }`);
  }
  getProjects():Promise<Project[]> {
    return this.client.fetch(`*[_type=="portfolioProject" && visible!=false]|order(featured desc,order asc,_createdAt desc){
      _id,"slug":slug.current,titleFr,titleEn,summaryFr,summaryEn,descriptionFr,descriptionEn,
      challengeFr,challengeEn,solutionFr,solutionEn,resultFr,resultEn,
      category,technologies,year,featured,"coverUrl":cover.asset->url,
      "galleryUrls":gallery[].asset->url,demoUrl,githubUrl
    }`);
  }
  getProject(slug:string):Promise<Project|null> {
    return this.client.fetch(`*[_type=="portfolioProject" && slug.current==$slug && visible!=false][0]{
      _id,"slug":slug.current,titleFr,titleEn,summaryFr,summaryEn,descriptionFr,descriptionEn,
      challengeFr,challengeEn,solutionFr,solutionEn,resultFr,resultEn,
      category,technologies,year,featured,"coverUrl":cover.asset->url,
      "galleryUrls":gallery[].asset->url,demoUrl,githubUrl
    }`,{slug});
  }
  getExperiences():Promise<Experience[]> {
    return this.client.fetch(`*[_type=="experience" && visible!=false]|order(startDate desc){
      _id,roleFr,roleEn,organization,location,descriptionFr,descriptionEn,startDate,endDate,current
    }`);
  }
  getEducations():Promise<Education[]> {
    return this.client.fetch(`*[_type=="education" && visible!=false]|order(year desc){
      _id,diplomaFr,diplomaEn,institution,year,descriptionFr,descriptionEn,kind,
      "certificateUrl":certificate.asset->url
    }`);
  }
  getServices():Promise<ServiceItem[]> {
    return this.client.fetch(`*[_type=="serviceItem" && visible!=false]|order(order asc){
      _id,titleFr,titleEn,descriptionFr,descriptionEn,iconKey
    }`);
  }
  getArticles():Promise<Article[]> {
    return this.client.fetch(`*[_type=="article" && visible!=false]|order(publishedAt desc){
      _id,"slug":slug.current,titleFr,titleEn,excerptFr,excerptEn,publishedAt,category,
      "imageUrl":image.asset->url
    }`);
  }
  getArticle(slug:string):Promise<Article|null> {
    return this.client.fetch(`*[_type=="article" && slug.current==$slug && visible!=false][0]{
      _id,"slug":slug.current,titleFr,titleEn,excerptFr,excerptEn,publishedAt,category,
      bodyFr,bodyEn,"imageUrl":image.asset->url
    }`,{slug});
  }
  getSettings():Promise<SiteSettings|null> {
    return this.client.fetch(`*[_type=="siteSettings"]|order(_updatedAt desc)[0]{
      email,github,linkedin,whatsapp,"cvUrl":cv.asset->url,
      locationFr,locationEn,availability,introFr,introEn
    }`);
  }
}
