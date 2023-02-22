<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\StockRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;


#[ORM\Entity(repositoryClass: StockRepository::class)]
#[ApiResource(paginationEnabled: false)]
#[ApiFilter(SearchFilter::class, properties: ['articles'=>'exact', 'size'=>'exact'])]

class Stock
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Articles $articles = null;

    #[ORM\ManyToOne]
    private ?Size $size = null;

    #[ORM\Column(nullable: true)]
    private ?int $NBStock = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getSize(): ?Size
    {
        return $this->size;
    }

    public function setSize(?Size $size): self
    {
        $this->size = $size;

        return $this;
    }

    public function getNBStock(): ?int
    {
        return $this->NBStock;
    }

    public function setNBStock(?int $NBStock): self
    {
        $this->NBStock = $NBStock;

        return $this;
    }
}
