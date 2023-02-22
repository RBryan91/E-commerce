<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CategorieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: CategorieRepository::class)]
#[ApiResource]
#[ApiResource(paginationEnabled: false)]

class Categorie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('articles')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('articles')]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'categorie', targetEntity: Articles::class)]
    private Collection $articles;

    #[ORM\OneToMany(mappedBy: 'categorie', targetEntity: Souscategorie::class)]
    private Collection $souscategories;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
        $this->souscategories = new ArrayCollection();
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
            $article->setCategorie($this);
        }

        return $this;
    }

    public function removeArticle(Articles $article): self
    {
        if ($this->articles->removeElement($article)) {
            // set the owning side to null (unless already changed)
            if ($article->getCategorie() === $this) {
                $article->setCategorie(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Souscategorie>
     */
    public function getSouscategories(): Collection
    {
        return $this->souscategories;
    }

    public function addSouscategory(Souscategorie $souscategory): self
    {
        if (!$this->souscategories->contains($souscategory)) {
            $this->souscategories->add($souscategory);
            $souscategory->setCategorie($this);
        }

        return $this;
    }

    public function removeSouscategory(Souscategorie $souscategory): self
    {
        if ($this->souscategories->removeElement($souscategory)) {
            // set the owning side to null (unless already changed)
            if ($souscategory->getCategorie() === $this) {
                $souscategory->setCategorie(null);
            }
        }

        return $this;
    }
}
