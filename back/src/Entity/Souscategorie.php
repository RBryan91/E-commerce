<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SouscategorieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: SouscategorieRepository::class)]
#[ApiResource]
#[ApiResource(paginationEnabled: false)]
class Souscategorie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('articles')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('articles')]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'souscategorie', targetEntity: Articles::class)]
    private Collection $articles;

    #[ORM\ManyToOne(inversedBy: 'souscategories')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('articles')]
    private ?Categorie $categorie = null;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Articles>
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Articles $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles->add($article);
            $article->setSouscategorie($this);
        }

        return $this;
    }

    public function removeArticle(Articles $article): self
    {
        if ($this->articles->removeElement($article)) {
            // set the owning side to null (unless already changed)
            if ($article->getSouscategorie() === $this) {
                $article->setSouscategorie(null);
            }
        }

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
}
