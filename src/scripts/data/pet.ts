import Pet from "../../types/pet.interface";

const birthDatePet1 = new Date("2015-02-27");
const birthDatePet2 = new Date("2015-02-10");

const defaultPets: Pet[] = [
    {
        name: "Viejon",
        birthDate: birthDatePet1,
        avatarRaceName: "Beagle",
        ownerUsername: "Walle"
    },
    {
        name: "Candy",
        birthDate: birthDatePet2,
        avatarRaceName: "Siamés",
        ownerUsername: "Invisible"
    }
];

export default defaultPets;