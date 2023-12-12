const LOCALE = {
    id: {
        title: "Catatan Ku",
        login: "Masuk",
        logout: "Keluar",
        register: "Daftar",
        name: "Nama",
        email: "Surel",
        password: "Kata Sandi",
        confirmPassword: "Konfirm Kata Sandi",
        notFound404: "404 Tidak Ditemukan",
        notFound404Message: "Oops! Halaman yang Anda cari tidak ditemukan.",
        backToHome: "Kembali ke Halaman Utama",
        notes: "Catatan",
        archived: "Arsip",
        msgEmailEmpty: "Surel belum terisi!",
        msgPasswordEmpty: "Kata Sandi belum terisi!",
        msgNameEmpty: "Nama belum terisi!",
        msgPasswordNotMatch: "Kata Sandi dan Konfirm Kata Sandi tidak sesuai!",
        msgRegisterSuccess: "Daftar Akun Berhasil. Masuk untuk melanjutkan!",
        characterLeft: "Sisa Karakter",
        save: "Simpan",
        msgNoteEmpty: "Catatan belum terisi!",
        searchNote: "Cari catatan...",
        search: "Cari",
        addNote: "Tambah Catatan",
        activeNote: "Catatan Aktif",
        loading: "Memuat...",
        noteNotFound: "Catatan tidak ditemukan!",
        archivedNotFound: "Arsip Catatan tidak ditemukan!",
        detail: "Detail",
        delete: "Hapus",
        unarchive: "Aktifkan",
        archiving: "Arsipkan",
    },
    en: {
        title: "My Notes App",
        login: "Login",
        logout: "Logout",
        register: "Register",
        name: "Name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        notFound404: "404 Not Found",
        notFound404Message:
            "Oops! The page you're looking for doesn't seem to exist.",
        backToHome: "Back To Home",
        notes: "Notes",
        archived: "Archived",

        msgEmailEmpty: "Please input the Email!",
        msgPasswordEmpty: "Please input the Password!",
        msgNameEmpty: "Please input the Name!",
        msgPasswordNotMatch: "Password and Confirm Password not match!",
        msgRegisterSuccess: "Register success, please login to continue!",
        characterLeft: "Character Left",
        save: "Save",
        msgNoteEmpty: "Please input the Note!",
        searchNote: "Search note...",
        search: "Search",
        addNote: "Add Note",
        activeNote: "Active Notes",
        loading: "Loading...",
        noteNotFound: "Notes not found!",
        archivedNotFound: "Archived Notes not found!",
        detail: "Detail",
        delete: "Delete",
        unarchive: "Unarchive",
        archiving: "Archiving",
    },
};

const getLocale = (language = "id") => {
    if (language !== "id" && language !== "en") {
        return LOCALE.id;
    }
    return LOCALE[language];
};

export function getItemLocale() {
    return localStorage.getItem("locale");
}

export function putItemLocale(locale) {
    return localStorage.setItem("locale", locale);
}

export default getLocale;
