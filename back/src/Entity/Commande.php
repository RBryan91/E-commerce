<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CommandeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use DateTime;
use DateTimeInterface;
use Symfony\Component\Form\Extension\Core\Type\DateType;

#[ORM\Entity(repositoryClass: CommandeRepository::class)]
#[ApiResource(paginationEnabled: false,normalizationContext: ['groups' => ['commande']])]
#[ApiFilter(SearchFilter::class, properties: ['user'=>'exact'])]


class Commande
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('commande')]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups('commande')]
    private ?User $user = null;

    #[ORM\Column(length: 255)]
    #[Groups('commande')]
    private ?string $numero = null;

    #[ORM\Column(length: 255)]
    #[Groups('commande')]
    private ?string $montant = null;

    #[ORM\OneToMany(mappedBy: 'commande', targetEntity: CommandeArticles::class)]
    #[Groups('commande')]
    private Collection $commandeArticles;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups('commande')]
    private ?\DateTimeInterface $date = null;

    public function __construct()
    {
        $this->commandeArticles = new ArrayCollection();
        $this->date = new DateTime(); 
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getNumero(): ?string
    {
        return $this->numero;
    }

    public function setNumero(string $numero): self
    {
        $this->numero = $numero;

        return $this;
    }

    public function getMontant(): ?string
    {
        return $this->montant;
    }

    public function setMontant(string $montant): self
    {
        $this->montant = $montant;

        return $this;
    }

    /**
     * @return Collection<int, CommandeArticles>
     */
    public function getCommandeArticles(): Collection
    {
        return $this->commandeArticles;
    }

    public function addCommandeArticle(CommandeArticles $commandeArticle): self
    {
        if (!$this->commandeArticles->contains($commandeArticle)) {
            $this->commandeArticles->add($commandeArticle);
            $commandeArticle->setCommande($this);
        }

        return $this;
    }

    public function removeCommandeArticle(CommandeArticles $commandeArticle): self
    {
        if ($this->commandeArticles->removeElement($commandeArticle)) {
            // set the owning side to null (unless already changed)
            if ($commandeArticle->getCommande() === $this) {
                $commandeArticle->setCommande(null);
            }
        }

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }
}
