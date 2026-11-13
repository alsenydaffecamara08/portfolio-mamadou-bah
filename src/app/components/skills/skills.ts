
import {
  Component,
  Input,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  PortfolioSkill,
  SanityService
} from '../../services/sanity.service';

import {
  RevealDirective
} from '../../directives/reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class SkillsComponent implements OnInit {

  @Input() langue: 'fr' | 'en' = 'fr';

  private sanity = inject(SanityService);

  competences = signal<PortfolioSkill[]>([]);
  chargement = signal(true);
  erreur = signal(false);

  categories = [
    'frontend',
    'backend',
    'database',
    'devops',
    'other'
  ];

  async ngOnInit(): Promise<void> {
    try {
      const donnees = await this.sanity.getSkills();
      this.competences.set(donnees);
    } catch (error) {
      console.error('Compétences Sanity :', error);
      this.erreur.set(true);
    } finally {
      this.chargement.set(false);
    }
  }

  nomCategorie(categorie: string): string {
    const noms: Record<string, [string, string]> = {
      frontend: ['Développement Frontend', 'Frontend Development'],
      backend: ['Backend & API', 'Backend & APIs'],
      database: ['Bases de données', 'Databases'],
      devops: ['Outils & DevOps', 'Tools & DevOps'],
      other: ['Autres compétences', 'Other Skills']
    };

    const valeur = noms[categorie] ?? [categorie, categorie];

    return this.langue === 'fr' ? valeur[0] : valeur[1];
  }

  description(skill: PortfolioSkill): string {
    return this.langue === 'fr'
      ? skill.descriptionFr || ''
      : skill.descriptionEn || '';
  }

  parCategorie(categorie: string): PortfolioSkill[] {
    return this.competences().filter(
      skill => skill.category === categorie
    );
  }
}
