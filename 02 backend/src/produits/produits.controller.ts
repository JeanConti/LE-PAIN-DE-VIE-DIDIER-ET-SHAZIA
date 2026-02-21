import { Controller, Get } from '@nestjs/common';

@Controller('api/produits')
export class ProduitsController {
  @Get()
  findAll() {
    return [
      { id: 1, nom: 'Pain Artisanal', description: "Pain artisanal à l'ancienne", image: '/images/produits/Plusieurs-Pains-V2.png', lien: '/pain' },
      { id: 2, nom: 'Pizzas', description: 'Pizzas à la sauce courgette ou potimarron', image: '/images/produits/Pizzas-ed.jpg', lien: '/pizza' },
      { id: 3, nom: 'Brioche', description: 'Faite maison', image: '/images/produits/Brioche-grande.jpg', lien: '/brioche' },
      { id: 4, nom: 'Viennoiseries', description: 'Des délicieuses viennoiseries artisanales', image: '/images/produits/Viennoiseries.jpg', lien: '/viennoiserie' },
    ];
  }
}
