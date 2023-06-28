package learn.gamer.data;

import learn.gamer.models.AppUser;
import org.springframework.transaction.annotation.Transactional;

public interface AppUserRepository {
    AppUser findByUserNname(String username);

    @Transactional
    AppUser create(AppUser user);

    @Transactional
    void update(AppUser user);
}
