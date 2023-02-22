<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PaiementRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PaiementRepository::class)]
#[ApiResource(paginationEnabled: false)]

class Paiement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['panier','panierarticles','user'])]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'paiement', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\Column(length: 255)]
    #[Groups(['panier','panierarticles','user'])]
    private ?string $carte = null;

    #[ORM\Column(length: 255)]
    #[Groups(['panier','panierarticles','user'])]
    private ?string $CVC = null;

    #[ORM\Column(length: 255)]
    #[Groups(['panier','panierarticles','user'])]
    private ?string $date = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCarte(): ?string
    {
        return $this->carte;
    }

    public function setCarte(string $carte): self
    {
        $this->carte = $carte;

        return $this;
    }

    public function getCVC(): ?string
    {
        return $this->CVC;
    }

    public function setCVC(string $CVC): self
    {
        $this->CVC = $CVC;

        return $this;
    }

    public function getDate(): ?string
    {
        return $this->date;
    }

    public function setDate(string $date): self
    {
        $this->date = $date;

        return $this;
    }
}
