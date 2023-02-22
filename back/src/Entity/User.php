<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ['email'=>'exact',"password"=>"exact"])]
#[ApiResource(paginationEnabled: false,normalizationContext: ['groups' => ['user']])]

class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['panier','panierarticles','user','comments'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('user')]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups('user')]
    private ?string $password = null;

    #[ORM\Column]
    #[Groups('user')]
    private ?int $is_active = null;

    #[ORM\Column]
    #[Groups('user')]
    private ?int $role = null;

    #[ORM\Column(length: 255)]
    #[Groups('user')]
    private ?string $Nom = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user','comments'])]
    private ?string $Prenom = null;

    #[ORM\Column(length: 255)]
    #[Groups('user')]
    private ?string $Tel = null;

    #[ORM\Column(length: 255)]
    #[Groups('user')]
    private ?string $Adresse = null;

    #[Groups(['panier','panierarticles','user'])]
    #[ORM\Column(length: 255)]
    private ?string $Pays = null;

    #[ORM\Column(length: 255)]
    #[Groups('user')]
    private ?string $Ville = null;

    #[ORM\Column(length: 255)]
    #[Groups('user')]
    private ?string $zipcode = null;

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'])]
    #[Groups(['panier','panierarticles','user'])]
    private ?Paiement $paiement = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getIsActive(): ?int
    {
        return $this->is_active;
    }

    public function setIsActive(int $is_active): self
    {
        $this->is_active = $is_active;

        return $this;
    }

    public function getRole(): ?int
    {
        return $this->role;
    }

    public function setRole(int $role): self
    {
        $this->role = $role;
        return $this;
    }

    public function getNom(): ?string
    {
        return $this->Nom;
    }

    public function setNom(string $Nom): self
    {
        $this->Nom = $Nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->Prenom;
    }

    public function setPrenom(string $Prenom): self
    {
        $this->Prenom = $Prenom;

        return $this;
    }

    public function getTel(): ?string
    {
        return $this->Tel;
    }

    public function setTel(string $Tel): self
    {
        $this->Tel = $Tel;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->Adresse;
    }

    public function setAdresse(string $Adresse): self
    {
        $this->Adresse = $Adresse;

        return $this;
    }

    public function getPays(): ?string
    {
        return $this->Pays;
    }

    public function setPays(string $Pays): self
    {
        $this->Pays = $Pays;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->Ville;
    }

    public function setVille(string $Ville): self
    {
        $this->Ville = $Ville;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getPaiement(): ?Paiement
    {
        return $this->paiement;
    }

    public function setPaiement(Paiement $paiement): self
    {
        // set the owning side of the relation if necessary
        if ($paiement->getUser() !== $this) {
            $paiement->setUser($this);
        }

        $this->paiement = $paiement;

        return $this;
    }
}
