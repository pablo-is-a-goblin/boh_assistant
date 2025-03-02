import NewMateriaModal from "../components/generics/NewMateriaModal";
import GenericsCard from "../components/generics/GenericsCard";
import NewMemoryModal from "../components/memory/NewMemoryModal";
import MemoryCard from "../components/memory/MemoryCard";
import NewSkillModal from "../components/skill/NewSkillModal";
import SkillsCard from "../components/skill/SkillsCard";
import NewBookModal from "../components/book/NewBookModal";
import BookCard from "../components/book/BookCard";
import GenericDetail from "../components/generics/GenericDetail";
import BookDetail from "../components/book/BookDetail";
import SkillDetail from "../components/skill/SkillDetail";
import MemoryDetail from "../components/memory/MemoryDetail";

export const API_URL = "http://localhost:8080/wiki/api/";

export const CONF = {
    principle: {
        pretty: "Principle",
        pretties: "Principles",
        type: 'principle',
        modal: NewMateriaModal,
        card: GenericsCard,
        detail: GenericDetail,
    },
    skill: {
        pretty: "Skill",
        pretties: "Skills",
        type: 'skill',
        modal: NewSkillModal,
        card: SkillsCard,
        detail: SkillDetail,

    },
    skill_label: {
        pretty: "Skill Label",
        pretties: "Skill Labels",
        type: 'skill_label',
        modal: NewMateriaModal,
        card: GenericsCard,
        detail: GenericDetail,

    },
    object_label: {
        pretty: "Object Label",
        pretties: "Object Labels",
        type: 'object_label',
        modal: NewMateriaModal,
        card: GenericsCard,
        detail: GenericDetail,

    },
    tongue: {
        pretty: "Tongue",
        pretties: "Tongues",
        type: "tongue",
        modal: NewMateriaModal,
        card: GenericsCard,
        detail: GenericDetail,

    },
    memory: {
        pretty: "Memory",
        pretties: "Memories",
        type: "memory",
        modal: NewMemoryModal,
        card: MemoryCard,
        detail: MemoryDetail,

    },
    book: {
        pretty: "Book",
        pretties: "Books",
        type: 'book',
        modal: NewBookModal,
        card: BookCard,
        detail: BookDetail,

    }
}