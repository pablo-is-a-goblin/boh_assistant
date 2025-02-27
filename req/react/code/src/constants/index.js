import NewMateriaModal from "../components/generics/NewMateriaModal";
import GenericsCard from "../components/generics/GenericsCard";
import NewMemoryModal from "../components/memory/NewMemoryModal";
import MemoryCard from "../components/memory/MemoryCard";
import NewSkillModal from "../components/skill/NewSkillModal";
import SkillsCard from "../components/skill/SkillsCard";
import NewBookModal from "../components/book/NewBookModal";
import BookCard from "../components/book/BookCard";

export const API_URL = "http://localhost:8080/wiki/api/";

export const CONF = {
    principle: {
        pretty: "Principle",
        pretties: "Principles",
        type: 'principle',
        modal: NewMateriaModal,
        card: GenericsCard,
    },
    skill: {
        pretty: "Skill",
        pretties: "Skills",
        type: 'skill',
        modal: NewSkillModal,
        card: SkillsCard,

    },
    skill_label: {
        pretty: "Skill Label",
        pretties: "Skill Labels",
        type: 'skill_label',
        modal: NewMateriaModal,
        card: GenericsCard,

    },
    object_label: {
        pretty: "Object Label",
        pretties: "Object Labels",
        type: 'object_label',
        modal: NewMateriaModal,
        card: GenericsCard,

    },
    tongue: {
        pretty: "Tongue",
        pretties: "Tongues",
        type: "tongue",
        modal: NewMateriaModal,
        card: GenericsCard,

    },
    memory: {
        pretty: "Memory",
        pretties: "Memories",
        type: "memory",
        modal: NewMemoryModal,
        card: MemoryCard,

    },
    book: {
        pretty: "Book",
        pretties: "Books",
        type: 'book',
        modal: NewBookModal,
        card: BookCard,
    }
}