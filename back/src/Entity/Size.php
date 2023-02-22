<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SizeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SizeRepository::class)]
#[ApiResource]
class Size
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToMany(mappedBy: 'size', targetEntity: PanierArticles::class)]
    private Collection $size;

    #[Groups(['panierarticles','commande'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    public function __construct()
    {
        $this->size = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, PanierArticles>
     */
    public function getSize(): Collection
    {
        return $this->size;
    }

    public function addSize(PanierArticles $size): self
    {
        if (!$this->size->contains($size)) {
            $this->size->add($size);
            $size->setSize($this);
        }

        return $this;
    }

    public function removeSize(PanierArticles $size): self
    {
        if ($this->size->removeElement($size)) {
            // set the owning side to null (unless already changed)
            if ($size->getSize() === $this) {
                $size->setSize(null);
            }
        }

        return $this;
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
}
