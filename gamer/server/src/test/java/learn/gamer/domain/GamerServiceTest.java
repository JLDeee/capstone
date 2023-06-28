package learn.gamer.domain;

import learn.gamer.data.GamerRepository;
import learn.gamer.data.MatchRepository;
import learn.gamer.models.Game;
import learn.gamer.models.Gamer;
import learn.gamer.models.Gender;
import learn.gamer.models.Match;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class GamerServiceTest {

    @Autowired
    GamerService service;

    @MockBean
    GamerRepository repository;

    @Test
    void shouldFindAll() {

        when(repository.findAll()).thenReturn(List.of(
                new Gamer(1, 1, Gender.MALE, "JLD", LocalDate.of(1999, 06, 04), "ADC main in League of Legends. Looking for a support duo to play with. :)"),
                new Gamer(2, 2, Gender.FEMALE, "isabelle", LocalDate.of(2001, 04, 14), "Looking for someone to play Animal Crossing with and vibe!")
        ));

        List<Gamer> gamers = service.findAll();

        assertEquals(2, gamers.size());
    }

    @Test
    void shouldFindByGamerTag(){
        when(repository.findByGamerTag("JLD")).thenReturn(new Gamer());
        Gamer gamer = service.findByGamerTag("JLD");
        assertNotNull(gamer);
    }

    @Test
    void shouldNotFindNullByGamerTag(){
        Gamer gamer = service.findByGamerTag("BABABOOP");
        assertNull(gamer);
    }

    @Test
    void shouldFindHaloByGameTitle() {
        when(repository.findByGameTitle("Fire Emblem")).thenReturn(new Gamer());
        Gamer gamer = service.findByGameTitle("Fire Emblem");
        assertNotNull(gamer);
    }

    @Test
    void shouldNotFindNullByGameTitle(){
        Gamer gamer = service.findByGameTitle("BABABOOP");
        assertNull(gamer);
    }

    @Test
    void shouldCreateGamer(){
        Gamer gamer = new Gamer();
        gamer.setGamerId(1);
        gamer.setAppUserId(1);
        gamer.setGamerTag("JLD");
        gamer.setGenderType(Gender.MALE);
        gamer.setBirthDate(LocalDate.of(1999, 06, 04));
        gamer.setBio("ADC main in League of Legends. Looking for a support duo to play with. :)");

        when(repository.create(gamer)).thenReturn(gamer);

        Result<Gamer> result = service.create(gamer);

        assertTrue(result.isSuccess());
        assertEquals(result.getMessages().size(), 0);
    }

    @Test
    void shouldNotCreateNullGamer(){
        Gamer gamer = new Gamer();

        Result<Gamer> result = service.create(gamer);

        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }

    @Test
    void shouldNotCreateGamerIfGamerTagIsNull(){
        Gamer gamer = new Gamer();
        gamer.setGamerId(1);
        gamer.setAppUserId(1);
        gamer.setGenderType(Gender.MALE);
        gamer.setBirthDate(LocalDate.of(1999, 06, 04));
        gamer.setBio("ADC main in League of Legends. Looking for a support duo to play with. :)");

        when(repository.create(gamer)).thenReturn(gamer);

        Result<Gamer> result = service.create(gamer);

        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }

    @Test
    void shouldNotCreateGamerIfGenderTypeIsNull(){
        Gamer gamer = new Gamer();
        gamer.setGamerId(1);
        gamer.setAppUserId(1);
        gamer.setGamerTag("JLD");
        gamer.setBirthDate(LocalDate.of(1999, 06, 04));
        gamer.setBio("ADC main in League of Legends. Looking for a support duo to play with. :)");

        when(repository.create(gamer)).thenReturn(gamer);

        Result<Gamer> result = service.create(gamer);

        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }

    @Test
    void shouldNotCreateGamerIfBirthDateIsNull(){
        Gamer gamer = new Gamer();
        gamer.setGamerId(1);
        gamer.setAppUserId(1);
        gamer.setGamerTag("JLD");
        gamer.setGenderType(Gender.MALE);
        gamer.setBio("ADC main in League of Legends. Looking for a support duo to play with. :)");

        when(repository.create(gamer)).thenReturn(gamer);

        Result<Gamer> result = service.create(gamer);

        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }

    @Test
    void shouldNotCreateGamerIfBioIsNull(){
        Gamer gamer = new Gamer();
        gamer.setGamerId(1);
        gamer.setAppUserId(1);
        gamer.setGamerTag("JLD");
        gamer.setGenderType(Gender.MALE);
        gamer.setBirthDate(LocalDate.of(1999, 06, 04));

        when(repository.create(gamer)).thenReturn(gamer);

        Result<Gamer> result = service.create(gamer);

        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }

    @Test
    void shouldFindGamerByGameTitle(){
        when(repository.findByGameTitle("Halo")).thenReturn(new Gamer());
        Gamer gamer = service.findByGameTitle("Halo");
        assertNotNull(gamer);
    }

    @Test
    void shouldNotFindGamerByNullGameTitle(){

    }



}