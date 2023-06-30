package learn.gamer.data;

import learn.gamer.models.Game;
import learn.gamer.models.GamerGame;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataAccessException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class GamerGameJdbcTemplateRepositoryTest {
    @Autowired
    private GamerGameJdbcTemplateRepository repository;

    @Autowired
    private KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldAdd() {
        GamerGame gamerGame = getGamerGame();
        assertTrue(repository.add(gamerGame));

        try {
            repository.add(gamerGame);
            // TODO: apparently this is supposed to fail, but why?
            fail("Cannot add the same game to the gamer twice.");
        } catch (DataAccessException ex) {

        }
    }

    @Test
    void shouldDeleteByKey() {
        assertTrue(repository.deleteByKey(2, 1));
        assertFalse(repository.deleteByKey(2, 1));
    }

    private GamerGame getGamerGame() {
        GamerGame gamerGame = new GamerGame();
        gamerGame.setGamerId(1);

        Game game = new Game();
        game.setGameId(9);
        game.setGameTitle("Zero Escape: The Nonary Games");
        gamerGame.setGame(game);

        return gamerGame;
    }
}