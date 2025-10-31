import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  Stack,
  useTheme,Box,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const cgvCguData = [
  {     
    id: "cgvs",
    title: "Conditions Générales de Vente (CGV)",
    content: `Société par Actions Simplifiée (SAS) au capital de 2 000 €
Immatriculée au RCS d’Évry sous le numéro 934 737 974
Date d’immatriculation : 05 novembre 2024
Siège social : 6 Rue de la Grange, 91330 Yerres, France
Président : M. Saidi MAHIOUT, né le 17/02/1965 à Aïn El Hammem (Algérie)
Durée de la société : Jusqu’au 05 novembre 2123
Date de clôture de l’exercice social : 31 décembre
Activités principales : Négoce, commerce de gros/demi-gros et détail, import-export, centrale d’achat de produits non réglementés, vente en ligne et en direct.

Article 1 – Objet
Les présentes Conditions Générales de Vente (CGV) définissent les modalités contractuelles entre ALL TRADE BUSINESS et ses clients dans le cadre de :
- la vente de produits en gros, demi-gros ou détail
- l’import-export de produits
- l’activité de centrale d’achat pour des produits divers non réglementés
- la vente en ligne et par devis
L’acceptation sans réserve des présentes CGV est obligatoire pour toute commande et vaut adhésion complète du client aux conditions énoncées.

Article 2 – Commandes
Toute commande doit être précédée d’une demande de devis.
Le devis précise les produits, quantités, prix, délais et conditions particulières.
La commande est considérée ferme et définitive dès validation écrite (signature ou acceptation électronique) par le client.

⚠️ Les commandes restent soumises à la disponibilité des stocks ou aux conditions d’approvisionnement import/export.

Article 3 – Tarifs et Paiement
Les prix sont exprimés en euros (€) :
- TTC pour les particuliers
- HT pour les professionnels
Ils peuvent être modifiés sans préavis en fonction du marché et des conditions d’approvisionnement.
Le paiement s’effectue par virement bancaire, carte bancaire sécurisée ou autres moyens précisés sur le devis.
Aucun escompte n’est accordé sauf mention expresse et écrite.
Conformément à l’article L441-10 du Code de commerce, tout retard de paiement entraîne des pénalités de retard et une indemnité forfaitaire pour frais de recouvrement.

Article 4 – Annulation et Rétractation
Pour les professionnels : aucune annulation ou rétractation ne peut être acceptée après validation de la commande, sauf accord écrit d’ALL TRADE BUSINESS.
Pour les consommateurs particuliers, le droit de rétractation de 14 jours prévu par l’article L221-18 du Code de la consommation s’applique, sauf pour les produits exclus (produits personnalisés, scellés après ouverture, denrées périssables, etc.).

Article 5 – Obligations du client
Le client s’engage à :
- fournir des informations exactes lors de la commande
- vérifier la conformité des produits à réception et signaler toute anomalie dans les 48 heures suivant la livraison, conformément aux articles L217-4 et suivants du Code de la consommation
- utiliser les produits conformément à leur destination et aux réglementations en vigueur
Toute dégradation ou mauvaise utilisation relève de la responsabilité du client.

Article 6 – Obligations d’ALL TRADE BUSINESS
ALL TRADE BUSINESS garantit :
- la conformité des produits livrés avec le devis ou la commande validée
- le remplacement ou remboursement en cas de produit défectueux ou non conforme, dans les limites légales
- une livraison sécurisée selon les délais convenus

Article 7 – Retards et impossibilité d’exécution
ALL TRADE BUSINESS ne peut être tenue responsable des retards ou impossibilités de livraison dus à des cas de force majeure : grèves, intempéries, ruptures d’approvisionnement, blocages logistiques, événements politiques, pandémies, etc.
En cas d’impossibilité d’exécution, le client sera intégralement remboursé des sommes versées, sans indemnité complémentaire.

Article 8 – Responsabilité
ALL TRADE BUSINESS est assurée en responsabilité civile professionnelle.
La société décline toute responsabilité en cas de :
- mauvaise utilisation des produits
- retard imputable au client
- utilisation non conforme aux normes ou réglementations en vigueur

Article 9 – Protection des données personnelles
Conformément au RGPD et à la loi Informatique et Libertés, ALL TRADE BUSINESS collecte uniquement les données nécessaires à la gestion commerciale et contractuelle.
Chaque client dispose d’un droit d’accès, rectification, suppression, opposition et limitation de ses données.
Ces droits peuvent être exercés à l’adresse suivante :
📧 contact@alltradebusiness.site
📮 ALL TRADE BUSINESS – 6 Rue de la Grange, 91330 Yerres

Article 10 – Réclamations
Toute réclamation doit être adressée par écrit dans un délai de 7 jours suivant la livraison à :
📮 ALL TRADE BUSINESS – 6 Rue de la Grange, 91330 Yerres, France
📧 contact@alltradebusiness.site

Article 11 – Droit applicable et juridiction compétente
Les présentes CGV sont régies par le droit français.
En cas de litige, les parties s’efforceront de rechercher une solution amiable.
À défaut, compétence exclusive des tribunaux d’Évry, lieu du siège social de la société.
`,
  },
  { 
    id: "cgus",
    title: "Conditions Générales d’Utilisation (CGU)",
    content: `Article 1 – Objet
Les présentes CGU définissent les modalités d’accès et d’utilisation du site internet www.alltradebusiness.site, édité par :
ALL TRADE BUSINESS (ATB)
Forme juridique : Société par Actions Simplifiée (SAS)
Capital social : 2 000 €
Immatriculée au RCS d’Évry sous le numéro 934 737 974
Siège social : 6 Rue de la Grange, 91330 Yerres, France
Président : M. Saidi MAHIOUT

Article 2 – Acceptation des CGU
L’accès et l’utilisation du Site impliquent l’acceptation pleine et entière des présentes CGU.
L’utilisateur s’engage à respecter la législation en vigueur, ainsi que les règles de bonne conduite et de loyauté lors de sa navigation.

Article 3 – Accès au Site
ALL TRADE BUSINESS met tout en œuvre pour assurer un accès continu et sécurisé au Site.
Cependant, la société ne saurait être tenue responsable en cas :
- d’interruptions temporaires
- de bugs ou erreurs
- d’indisponibilités liées à des causes techniques, de maintenance ou de force majeure

Article 4 – Propriété intellectuelle
Le contenu du Site (textes, images, vidéos, logos, bases de données, design, code, etc.) est protégé par les droits de propriété intellectuelle.
Toute reproduction, représentation, modification ou distribution, totale ou partielle, sans l’autorisation préalable d’ALL TRADE BUSINESS, est strictement interdite.

Article 5 – Données personnelles
Les données personnelles collectées sur le Site sont traitées conformément à notre Politique de confidentialité, en conformité avec le RGPD et la loi Informatique et Libertés.

Article 6 – Responsabilité
ALL TRADE BUSINESS ne saurait être tenue responsable :
- des dommages directs ou indirects causés par l’utilisation du Site
- de la propagation éventuelle de virus ou programmes malveillants
- d’une mauvaise utilisation du Site par l’utilisateur
L’utilisateur est seul responsable de son équipement informatique, de sa connexion internet et de son usage du Site.

Article 7 – Modification des CGU
ALL TRADE BUSINESS se réserve le droit de modifier à tout moment les présentes CGU.
Toute modification prendra effet dès sa publication en ligne sur le Site.

Article 8 – Droit applicable et juridiction compétente
Les présentes CGU sont régies par le droit français.
En cas de litige, et après tentative de résolution amiable, les juridictions compétentes seront celles du ressort du Tribunal de Commerce d’Évry.
`,
  },
];

export const ConditionsGenerales = () => {
  const [activeId, setActiveId] = useState(cgvCguData[0].id);

  const activeSection = cgvCguData.find((s) => s.id === activeId);

  return (
    <Box
      sx={{
        display: "flex",
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 6 },
        backgroundColor: "#FDFCF8",
        color: "#101620",
      }}
    >
      {/* Sommaire */}
      <Box
        sx={{
          width: { xs: "0", md: "250px" },
          mr: 4,
          display: { xs: "none", md: "block" },
        }}
      >
        <Typography variant="h6" sx={{ color: "#2B4A6F", mb: 2, fontWeight: 700 }}>
          Sommaire
        </Typography>
        <Stack spacing={1}>
          {cgvCguData.map((section) => (
            <Typography
              key={section.id}
              sx={{
                cursor: "pointer",
                fontWeight: activeId === section.id ? 700 : 500,
                color: activeId === section.id ? "#AA9139" : "#101620",
                "&:hover": { color: "#c4a94f" },
              }}
              onClick={() => setActiveId(section.id)}
            >
              {section.title}
            </Typography>
          ))}
        </Stack>
      </Box>

      {/* Contenu animé */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={700}
          sx={{ color: "#AA9139", mb: 4 }}
        >
          Conditions Générales
        </Typography>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                mb: 6,
                p: 3,
                borderRadius: 2,
                border: "1px solid #AA9139",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.05)",
              }}
            >
              <Typography variant="h5" sx={{ color: "#2B4A6F", fontWeight: 600, mb: 2 }}>
                {activeSection.title}
              </Typography>
              <Typography component="div" whiteSpace="pre-line" sx={{ lineHeight: 1.6, fontSize: 14 }}>
                {activeSection.content}
              </Typography>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};