<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230121131442 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE commande ADD CONSTRAINT FK_6EEAA67DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE commande_articles ADD CONSTRAINT FK_69FD29F282EA2E54 FOREIGN KEY (commande_id) REFERENCES commande (id)');
        $this->addSql('ALTER TABLE commande_articles ADD CONSTRAINT FK_69FD29F21EBAF6CC FOREIGN KEY (articles_id) REFERENCES articles (id)');
        $this->addSql('ALTER TABLE commande_articles ADD CONSTRAINT FK_69FD29F2498DA827 FOREIGN KEY (size_id) REFERENCES size (id)');
        $this->addSql('ALTER TABLE paiement ADD CONSTRAINT FK_B1DC7A1EA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE panier ADD CONSTRAINT FK_24CC0DF2A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE panier_articles ADD CONSTRAINT FK_2598381A1EBAF6CC FOREIGN KEY (articles_id) REFERENCES articles (id)');
        $this->addSql('ALTER TABLE panier_articles ADD CONSTRAINT FK_2598381A498DA827 FOREIGN KEY (size_id) REFERENCES size (id)');
        $this->addSql('CREATE INDEX IDX_2598381A498DA827 ON panier_articles (size_id)');
        $this->addSql('ALTER TABLE stock ADD CONSTRAINT FK_4B3656601EBAF6CC FOREIGN KEY (articles_id) REFERENCES articles (id)');
        $this->addSql('ALTER TABLE stock ADD CONSTRAINT FK_4B365660498DA827 FOREIGN KEY (size_id) REFERENCES size (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE paiement DROP FOREIGN KEY FK_B1DC7A1EA76ED395');
        $this->addSql('ALTER TABLE articles DROP FOREIGN KEY FK_BFDD3168BCF5E72D');
        $this->addSql('ALTER TABLE articles DROP FOREIGN KEY FK_BFDD3168A27126E0');
        $this->addSql('ALTER TABLE commande DROP FOREIGN KEY FK_6EEAA67DA76ED395');
        $this->addSql('ALTER TABLE panier DROP FOREIGN KEY FK_24CC0DF2A76ED395');
        $this->addSql('ALTER TABLE panier_articles DROP FOREIGN KEY FK_2598381A1EBAF6CC');
        $this->addSql('ALTER TABLE panier_articles DROP FOREIGN KEY FK_2598381A498DA827');
        $this->addSql('DROP INDEX IDX_2598381A498DA827 ON panier_articles');
        $this->addSql('ALTER TABLE commande_articles DROP FOREIGN KEY FK_69FD29F282EA2E54');
        $this->addSql('ALTER TABLE commande_articles DROP FOREIGN KEY FK_69FD29F21EBAF6CC');
        $this->addSql('ALTER TABLE commande_articles DROP FOREIGN KEY FK_69FD29F2498DA827');
        $this->addSql('ALTER TABLE stock DROP FOREIGN KEY FK_4B3656601EBAF6CC');
        $this->addSql('ALTER TABLE stock DROP FOREIGN KEY FK_4B365660498DA827');
    }
}
