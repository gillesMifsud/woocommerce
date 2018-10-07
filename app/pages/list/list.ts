import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {ItemDetailsPage} from '../item-details/item-details';

@Component({
  templateUrl: 'build/pages/list/list.html'
})

export class ListPage {

  items = [

    {
      title : "E-Commerce",
      icon : "cart",
      note : "Sites Web",
      detail : `Chez Luence, nous proposons des solutions sur mesure web e-commerce, pour garantir
                au mieux la couverture de vos besoins, qu'elle qu'en soit leur nature`,
      image : "img/ecommerce.png"
    },
    {
      title : "Applications Mobiles",
      icon : "phone",
      note : "Sites Web",
      detail : `Notre pôle de développement applications mobiles se charge de vous créer
      l'application qui vous ressemble. Que ce soit Ios, Android ou encore Windows, nous
      avons la solution qui vous conviendra le mieux.`,
      image : "img/mobile.jpg"
    },
    {
      title : "Drupal",
      icon : "drupal",
      note : "CMS",
      detail : `Drupal est un logiciel qui permet aux individus comme aux communautés
                d'utilisateurs de publier facilement, de gérer et d'organiser un vaste
                éventail de contenus sur un site web. Des dizaines de milliers de personnes
                et d'organisations utilisent Drupal pour propulser des sites de toutes tailles
                et fonctions.`,
      image : "img/drupal.jpg"
    },
    {
      title : "Wordpress",
      icon : "wordpress",
      note : "CMS",
      detail : `WordPress constitue le nec plus ultra en matière de plates-formes sémantiques de
                publication personnelle, alliant esthétique, standards du Web et ergonomie.
                 Gratuit, WordPress n’en est pas moins inestimable. Sous licence GPLv2+, WordPress
                 est un logiciel libre et gratuit.`,
      image : "img/wordpress.jpg"
    },
    {
      title : "Symfony 2",
      icon : "symfony",
      note : "Framework",
      detail : `Symfony2 est un puissant framework qui va vous permettre de réaliser des sites
                complexes rapidement, mais de façon structurée et avec un code clair et maintenable.
                En un mot : le paradis du développeur !`,
      image : "img/symfony.jpg"
    }

  ];

  constructor(private nav: NavController, navParams: NavParams) {}

  itemTapped(event, item) {
    this.nav.push(ItemDetailsPage, {
      item: item
    });
  }
}
