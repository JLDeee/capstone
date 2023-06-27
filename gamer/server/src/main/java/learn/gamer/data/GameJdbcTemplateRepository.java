package learn.gamer.data;

import learn.gamer.data.mappers.GameMapper;
import learn.gamer.models.Game;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class GameJdbcTemplateRepository {
    private final JdbcTemplate jdbcTemplate;
    public GameJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Game> findAll() {
        final String sql = "select game_id, game_title "
                + "from game;";
        return jdbcTemplate.query(sql, new GameMapper());
    }


    public Game findByGameTitle(String gameTitle) {
        return null;
    }

    public Game add(Game game) {
        return null;
    }

    public boolean delete(String gameTitle) {
        return false;
    }
}
