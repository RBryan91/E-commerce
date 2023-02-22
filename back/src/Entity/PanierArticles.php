<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PanierArticlesRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: PanierArticlesRepository::class)]
#[ApiResource(paginationEnabled: false,normalizationContext: ['groups' => ['panierarticles']])]
#[ApiFilter(SearchFilter::class, properties:["panier"=>"exact","articles"=>"exact","size"=>"exact"])]
class PanierArticles
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('panierarticles')]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['panierarticles','panier'])]
    
    
    private ?Panier $panier = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('panierarticles')]
    private ?Articles $articles = null;

    #[Groups('panierarticles')]
    #[ORM\Column(options: ['default' => 1])]
    private ?int $quantity = null;
    
    #[Groups('panierarticles')]
    #[ORM\ManyToOne(inversedBy: 'size')]
    private ?Size $size = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPanier(): ?Panier
    {
        return $this->panier;
    }

    public function setPanier(?Panier $panier): self
    {
        $this->panier = $panier;

        return $this;
    }

    public function getArticles(): ?Articles
    {
        return $this->articles;
    }

    public function setArticles(?Articles $articles): self
    {
        $this->articles = $articles;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getSize(): ?Size
    {
        return $this->size;
    }

    public function setSize(?Size $size): self
    {
        $this->size = $size;

        return $this;
    }
}
