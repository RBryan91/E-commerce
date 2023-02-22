<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PoidRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: PoidRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ['poid'=>'exact'])]
#[ApiResource(paginationEnabled: false)]

class Poid
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?string $poid = null;

    #[ORM\Column]
    private ?string $prix = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPoid(): ?string
    {
        return $this->poid;
    }

    public function setPoid(string $poid): self
    {
        $this->poid = $poid;

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
}
