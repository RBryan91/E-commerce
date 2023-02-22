<?php

namespace App\Entity;
use ApiPlatform\Metadata\ApiFilter;
use App\Repository\ArticlesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;


#[ORM\Entity(repositoryClass: ArticlesRepository::class)]
#[ApiResource(order: ['click' => 'DESC'],paginationEnabled: false,normalizationContext: ['groups' => ['articles']])]
#[ApiFilter(SearchFilter::class, properties: ['categorie'=>'exact', 'souscategorie'=>'exact','titre'=>'partial'])]
#[ApiFilter(BooleanFilter::class, properties: ['color'])]

class Articles
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['panierarticles','articles','commande'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['panierarticles','articles','commande'])]
    private ?string $titre = null;

    #[ORM\Column(length: 255)]
    #[Groups(['panierarticles','articles','commande'])]
    private ?string $image = null;

    #[ORM\Column(length: 255)]
    #[Groups(['panierarticles','articles','commande'])]
    private ?string $prix = null;

    #[ORM\Column(length: 4000)]
    #[Groups('articles')]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'articles')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('articles')]
    private ?Categorie $categorie = null;

    #[ORM\ManyToOne(inversedBy: 'articles')]
    #[Groups('articles')]
    private ?Souscategorie $souscategorie = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups('articles')]
    private ?string $nbStock = null;

    #[ORM\Column]
    #[Groups('articles')]
    private ?bool $enRupture = null;

    #[ORM\Column]
    #[Groups('articles')]
    private ?int $click = null;

    #[ORM\Column]
    #[Groups(['panierarticles','articles','commande'])]
    private ?bool $Promo = null;

    #[ORM\Column]
    #[Groups(['panierarticles','articles','commande'])]
    private ?bool $Size = null;

    #[Groups(['panierarticles','articles'])]
    #[ORM\Column(length: 255)]
    private ?string $Poid = null;

    #[Groups(['panierarticles','articles','commande'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $Reduction = null;

    #[ORM\Column]
    #[Groups(['articles','commande'])]
    private ?bool $Nouveauté = null;

    #[ORM\Column(nullable: true)]
    #[Groups('articles')]
    private ?bool $color = null;

    
    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): self
    {
        $this->titre = $titre;

        return $this;
    }



    public function getPrix(): ?string
    {
        return $this->prix;
    }

    public function setPrix(string $prix): self
    {
        $this->prix = $prix;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCategorie(): ?Categorie
    {
        return $this->categorie;
    }

    public function setCategorie(?Categorie $categorie): self
    {
        $this->categorie = $categorie;

        return $this;
    }

    public function getSouscategorie(): ?Souscategorie
    {
        return $this->souscategorie;
    }

    public function setSouscategorie(?Souscategorie $souscategorie): self
    {
        $this->souscategorie = $souscategorie;

        return $this;
    }

    public function getNbStock(): ?string
    {
        return $this->nbStock;
    }

    public function setNbStock(?string $nbStock): self
    {
        $this->nbStock = $nbStock;

        return $this;
    }

    public function isEnRupture(): ?bool
    {
        return $this->enRupture;
    }

    public function setEnRupture(bool $enRupture): self
    {
        $this->enRupture = $enRupture;

        return $this;
    }

    public function getClick(): ?int
    {
        return $this->click;
    }

    public function setClick(int $click): self
    {
        $this->click = $click;

        return $this;
    }

    public function isPromo(): ?bool
    {
        return $this->Promo;
    }

    public function setPromo(bool $Promo): self
    {
        $this->Promo = $Promo;

        return $this;
    }

    public function isSize(): ?bool
    {
        return $this->Size;
    }

    public function setSize(bool $Size): self
    {
        $this->Size = $Size;

        return $this;
    }

    public function getPoid(): ?string
    {
        return $this->Poid;
    }

    public function setPoid(string $Poid): self
    {
        $this->Poid = $Poid;

        return $this;
    }

    public function getReduction(): ?string
    {
        return $this->Reduction;
    }

    public function setReduction(?string $Reduction): self
    {
        $this->Reduction = $Reduction;

        return $this;
    }

    public function isNouveauté(): ?bool
    {
        return $this->Nouveauté;
    }

    public function setNouveauté(bool $Nouveauté): self
    {
        $this->Nouveauté = $Nouveauté;

        return $this;
    }

    public function isColor(): ?bool
    {
        return $this->color;
    }

    public function setColor(?bool $color): self
    {
        $this->color = $color;

        return $this;
    }   
}
