package learn.gamer.data;

import learn.gamer.models.AppUser;
import learn.gamer.models.Game;

import java.util.List;

public interface AppUserRepository {
    List<AppUser> findAll();

    AppUser findByGamerTag(String gamerTag);

    Game findByGameTitle(String gameTitle);

    AppUser create(AppUser appUser);

    boolean delete(AppUser appUser);

    boolean update(AppUser appUser);
}
